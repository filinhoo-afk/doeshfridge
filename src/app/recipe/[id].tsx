import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { PrimaryButton } from '@/components/primary-button';
import { RecipeHero } from '@/components/recipe-photo';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { ingredientName, isPantry } from '@/data/ingredients';
import { getRecipe } from '@/data/recipes';
import { useTheme } from '@/hooks/use-theme';
import { formatMinutes, formatQuantity, formatServings } from '@/lib/format';
import { matchRecipe } from '@/lib/match';
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

  const match = useMemo(
    () => (recipe ? matchRecipe(recipe, availableIds(items), { assumePantry }) : null),
    [recipe, items, assumePantry],
  );

  if (!recipe || !match) {
    return (
      <View style={[styles.missing, { backgroundColor: theme.background }]}>
        <ThemedText>Рецепт не найден.</ThemedText>
      </View>
    );
  }

  const available = availableIds(items);

  const confirmCooked = () => {
    const used = itemsUsedByRecipe(recipe, items);

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
            consumeRecipe(recipe);
            recordCooked(recipe.id);
            router.back();
          },
        },
      ],
    );
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
        contentContainerStyle={styles.content}>
        <RecipeHero recipeId={recipe.id} />
        <View style={styles.header}>
          <ThemedText type="subtitle">{recipe.title}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {recipe.description}
          </ThemedText>
          <View style={styles.meta}>
            <MetaItem icon="time-outline" text={formatMinutes(recipe.timeMinutes)} />
            <MetaItem icon="people-outline" text={formatServings(recipe.servings)} />
          </View>
        </View>

        {recipe.equipment?.length ? (
          <View style={styles.section}>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
              ПОНАДОБИТСЯ
            </ThemedText>
            <ThemedText>{recipe.equipment.join(', ')}</ThemedText>
          </View>
        ) : null}

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            ИНГРЕДИЕНТЫ
          </ThemedText>

          {recipe.ingredients.map((ingredient) => {
            const pantry = assumePantry && isPantry(ingredient.ingredientId);
            const present = available.has(ingredient.ingredientId);
            const counted = !ingredient.optional && !pantry;
            const amount = formatQuantity(ingredient.amount ?? null, ingredient.unit ?? null);

            return (
              <View key={ingredient.ingredientId} style={styles.ingredientRow}>
                {/* Галочка только у того, что реально есть: ставить её
                    необязательному ингредиенту, которого нет, — обман. */}
                <Ionicons
                  name={present ? 'checkmark-circle' : 'ellipse-outline'}
                  size={20}
                  color={present ? theme.success : counted ? theme.warning : theme.textSecondary}
                />
                <ThemedText
                  style={[styles.ingredientName, !present && counted && { color: theme.warning }]}>
                  {ingredientName(ingredient.ingredientId)}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {ingredient.optional ? 'по желанию' : pantry && !present ? 'есть дома' : amount}
                </ThemedText>
              </View>
            );
          })}
        </View>

        {recipe.prep?.length ? (
          <View style={styles.section}>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
              ПОДГОТОВКА
            </ThemedText>
            {recipe.prep.map((line) => (
              <ThemedText key={line}>{line}</ThemedText>
            ))}
          </View>
        ) : null}

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            ПРИГОТОВЛЕНИЕ
          </ThemedText>

          {recipe.steps.map((step, index) => (
            <View key={step} style={styles.stepRow}>
              <View style={[styles.stepNumber, { backgroundColor: theme.backgroundElement }]}>
                <ThemedText type="smallBold">{index + 1}</ThemedText>
              </View>
              <ThemedText style={styles.stepText}>{step}</ThemedText>
            </View>
          ))}
        </View>

        {recipe.tips?.length ? (
          <View style={styles.section}>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
              СОВЕТЫ
            </ThemedText>
            {recipe.tips.map((tip) => (
              <View key={tip} style={styles.tipRow}>
                <ThemedText themeColor="accent">•</ThemedText>
                <ThemedText style={styles.stepText}>{tip}</ThemedText>
              </View>
            ))}
          </View>
        ) : null}

        <PrimaryButton title="Приготовил" icon="checkmark-done" onPress={confirmCooked} />
      </ScrollView>
    </>
  );
}

function MetaItem({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  const theme = useTheme();

  return (
    <View style={styles.metaItem}>
      <Ionicons name={icon} size={14} color={theme.textSecondary} />
      <ThemedText type="small" themeColor="textSecondary">
        {text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: Spacing.three,
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.two,
  },
  meta: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    letterSpacing: 0.6,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  ingredientName: {
    flex: 1,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
    paddingBottom: Spacing.two,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  stepText: {
    flex: 1,
  },
});
