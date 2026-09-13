import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { CategoryIcon } from '@/components/category-icon';
import { ListGroup } from '@/components/list-group';
import { PrimaryButton } from '@/components/primary-button';
import { RecipeHero } from '@/components/recipe-photo';
import { StepperButton } from '@/components/stepper-button';
import { Tag, TagRow } from '@/components/tag';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { getIngredient, ingredientName, isPantry } from '@/data/ingredients';
import { getRecipe } from '@/data/recipes';
import { useTheme } from '@/hooks/use-theme';
import { formatMinutes, formatQuantity, formatServings, formatServingsFor } from '@/lib/format';
import { matchRecipe } from '@/lib/match';
import { MAX_SERVINGS, MIN_SERVINGS, scaleRecipe } from '@/lib/scale';
import { useCookbook } from '@/store/cookbook';
import { availableIds, itemsUsedByRecipe, useFridge } from '@/store/fridge';

export default function RecipeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();

  const items = useFridge((state) => state.items);
  const assumePantry = useFridge((state) => state.assumePantry);
  const consumeRecipe = useFridge((state) => state.consumeRecipe);
  const isFavorite = useCookbook((state) => state.favorites.includes(id));
  const toggleFavorite = useCookbook((state) => state.toggleFavorite);
  const recordCooked = useCookbook((state) => state.recordCooked);

  const recipe = getRecipe(id);
  // 0 — «сколько написано в рецепте»: своё число появляется только после нажатия.
  const [chosenServings, setChosenServings] = useState(0);
  const servings = chosenServings || recipe?.servings || 1;

  const match = useMemo(
    () => (recipe ? matchRecipe(recipe, availableIds(items), { assumePantry }) : null),
    [recipe, items, assumePantry],
  );

  const scaled = useMemo(
    () => (recipe ? scaleRecipe(recipe, servings) : null),
    [recipe, servings],
  );

  if (!recipe || !match || !scaled) {
    return (
      <View style={[styles.missing, { backgroundColor: theme.background }]}>
        <ThemedText>Рецепт не найден.</ThemedText>
      </View>
    );
  }

  const available = availableIds(items);

  const confirmCooked = () => {
    // Списываем по пересчитанному рецепту: сварили на шестерых — ушло больше.
    const used = itemsUsedByRecipe(scaled, items);

    // Приготовить можно и без продуктов из холодильника — готовка всё равно
    // считается для «Часто готовлю», просто списывать нечего.
    if (used.length === 0) {
      Alert.alert('Приготовили?', 'Из холодильника ничего не спишется: продуктов этого рецепта в нём нет.', [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Да',
          onPress: () => {
            recordCooked(recipe.id);
            router.back();
          },
        },
      ]);
      return;
    }

    Alert.alert(
      'Приготовили?',
      `Из холодильника спишутся: ${used.map((item) => ingredientName(item.ingredientId)).join(', ')}.`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Списать',
          onPress: () => {
            consumeRecipe(scaled);
            recordCooked(recipe.id);
            router.back();
          },
        },
      ],
    );
  };

  const missingCount = match.missing.length;
  const readiness =
    missingCount === 0
      ? { label: 'всё есть', tone: 'success' as const, icon: 'checkmark-circle-outline' as const }
      : {
          label:
            missingCount === 1
              ? `не хватает: ${ingredientName(match.missing[0])}`
              : `не хватает ${missingCount}`,
          tone: 'warning' as const,
          icon: 'cart-outline' as const,
        };

  return (
    <>
      <Stack.Screen
        options={{
          title: recipe.title,
          headerRight: () => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
              hitSlop={Spacing.two}
              onPress={() => toggleFavorite(recipe.id)}>
              <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={theme.accent} />
            </Pressable>
          ),
        }}
      />
      <ScrollView
        style={{ backgroundColor: theme.background }}
        contentContainerStyle={styles.scroll}>
        {/* Фото вне отступов: от края до края, как обложка. */}
        <RecipeHero recipeId={recipe.id} />

        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText type="subtitle">{recipe.title}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {recipe.description}
            </ThemedText>
            <TagRow>
              <Tag icon="time-outline" label={formatMinutes(recipe.timeMinutes)} />
              <Tag icon={readiness.icon} label={readiness.label} tone={readiness.tone} />
            </TagRow>
          </View>

          <ListGroup>
            <View style={styles.servingsRow}>
              <Ionicons name="people-outline" size={20} color={theme.accent} />
              <ThemedText style={styles.grow}>{formatServings(servings)}</ThemedText>
              <StepperButton
                icon="remove"
                accessibilityLabel="Меньше порций"
                onPress={() => setChosenServings(Math.max(MIN_SERVINGS, servings - 1))}
              />
              <StepperButton
                icon="add"
                accessibilityLabel="Больше порций"
                onPress={() => setChosenServings(Math.min(MAX_SERVINGS, servings + 1))}
              />
            </View>
          </ListGroup>

          {recipe.equipment?.length ? (
            <ListGroup title="Понадобится">
              <View style={styles.padded}>
                <TagRow>
                  {recipe.equipment.map((tool) => (
                    <Tag key={tool} label={tool} />
                  ))}
                </TagRow>
              </View>
            </ListGroup>
          ) : null}

          <ListGroup
            title="Ингредиенты"
            footer={
              servings !== recipe.servings
                ? `Количества пересчитаны на ${formatServingsFor(servings)}. В шагах ниже остались исходные — рецепт написан на ${formatServingsFor(recipe.servings)}.`
                : undefined
            }>
            {scaled.ingredients.map((ingredient) => {
              const pantry = assumePantry && isPantry(ingredient.ingredientId);
              const present = available.has(ingredient.ingredientId);
              const counted = !ingredient.optional && !pantry;
              const amount = formatQuantity(ingredient.amount ?? null, ingredient.unit ?? null);
              const category = getIngredient(ingredient.ingredientId)?.category;

              return (
                <View key={ingredient.ingredientId} style={styles.ingredientRow}>
                  {category ? <CategoryIcon category={category} /> : null}
                  <ThemedText style={[styles.grow, !present && counted && { color: theme.warning }]}>
                    {ingredientName(ingredient.ingredientId)}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {ingredient.optional ? 'по желанию' : pantry && !present ? 'есть дома' : amount}
                  </ThemedText>
                  {/* Галочка только у того, что реально есть: ставить её
                      необязательному ингредиенту, которого нет, — обман. */}
                  <Ionicons
                    name={present ? 'checkmark-circle' : counted ? 'cart-outline' : 'ellipse-outline'}
                    size={18}
                    color={present ? theme.success : counted ? theme.warning : theme.border}
                  />
                </View>
              );
            })}
          </ListGroup>

          {recipe.prep?.length ? (
            <ListGroup title="Подготовка">
              {recipe.prep.map((line) => (
                <View key={line} style={styles.textRow}>
                  <View style={[styles.dot, { backgroundColor: theme.accent }]} />
                  <ThemedText style={styles.grow}>{line}</ThemedText>
                </View>
              ))}
            </ListGroup>
          ) : null}

          <ListGroup title="Приготовление">
            {recipe.steps.map((step, index) => (
              <View key={step} style={styles.textRow}>
                <View style={[styles.stepNumber, { backgroundColor: theme.accentSoft }]}>
                  <ThemedText type="smallBold" style={{ color: theme.accent }}>
                    {index + 1}
                  </ThemedText>
                </View>
                <ThemedText style={styles.grow}>{step}</ThemedText>
              </View>
            ))}
          </ListGroup>

          {recipe.tips?.length ? (
            <ListGroup title="Советы">
              {recipe.tips.map((tip) => (
                <View key={tip} style={styles.textRow}>
                  <Ionicons name="bulb-outline" size={20} color={theme.warning} />
                  <ThemedText style={styles.grow}>{tip}</ThemedText>
                </View>
              ))}
            </ListGroup>
          ) : null}

          <PrimaryButton title="Приготовил" icon="checkmark-done" onPress={confirmCooked} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingBottom: Spacing.four,
  },
  content: {
    padding: Spacing.three,
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.two,
  },
  servingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 52,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  padded: {
    padding: Spacing.three,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 48,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
    padding: Spacing.three,
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: Spacing.two,
  },
  grow: {
    flex: 1,
  },
});
