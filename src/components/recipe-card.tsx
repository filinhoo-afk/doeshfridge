import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ingredientName } from '@/data/ingredients';
import { formatDaysLeft } from '@/data/shelf-life';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatMinutes, formatProducts } from '@/lib/format';
import type { RecipeMatch, UrgentIngredient } from '@/lib/match';

import { RecipeCover } from './recipe-photo';
import { Tag, TagRow } from './tag';
import { ThemedText } from './themed-text';

type RecipeCardProps = {
  match: RecipeMatch;
  onPress: (recipeId: string) => void;
  /** Показать сердечко у названия. */
  favorite?: boolean;
  /** Пометка среди меток, например «готовили 5 раз». */
  note?: string;
};

/** Сколько срочных продуктов называть по имени, остальные — «и ещё N». */
const URGENT_SHOWN = 2;

/** «скоро испортится: колбаса — завтра, молоко — через 2 дн.» */
function urgentLine(urgent: UrgentIngredient[]): string {
  const shown = urgent
    .slice(0, URGENT_SHOWN)
    .map((item) => `${ingredientName(item.ingredientId)} — ${formatDaysLeft(item.days)}`);
  const rest = urgent.length - shown.length;
  return `скоро испортится: ${shown.join(', ')}${rest > 0 ? ` и ещё ${rest}` : ''}`;
}

/**
 * Карточка рецепта: фото на всю ширину — после перехода на единый стиль снимков
 * именно они делают список живым, — а под ним название и цветные метки.
 * Готовность цветом: зелёная «всё есть», жёлтая — чего не хватает.
 */
export function RecipeCard({ match, onPress, favorite = false, note }: RecipeCardProps) {
  const theme = useTheme();
  const { recipe, have, missing, urgent } = match;

  const readiness =
    missing.length === 0
      ? { label: 'всё есть', tone: 'success' as const }
      : missing.length === 1
        ? { label: `не хватает: ${ingredientName(missing[0])}`, tone: 'warning' as const }
        : { label: `не хватает ${missing.length}`, tone: 'warning' as const };

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(recipe.id)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.8 : 1 },
      ]}>
      <RecipeCover recipeId={recipe.id} />

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <ThemedText style={[styles.title, styles.grow]}>{recipe.title}</ThemedText>
          {favorite ? (
            <Ionicons name="heart" size={18} color={theme.accent} accessibilityLabel="В избранном" />
          ) : null}
        </View>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
          {recipe.description}
        </ThemedText>

        <TagRow>
          <Tag icon="time-outline" label={formatMinutes(recipe.timeMinutes)} />
          <Tag
            icon={missing.length === 0 ? 'checkmark-circle-outline' : 'cart-outline'}
            label={readiness.label}
            tone={readiness.tone}
          />
          {have.length > 0 ? (
            <Tag icon="basket-outline" label={`из холодильника: ${formatProducts(have.length)}`} />
          ) : null}
          {note ? <Tag icon="repeat-outline" label={note} /> : null}
        </TagRow>

        {missing.length > 1 ? (
          <ThemedText type="small" themeColor="textSecondary">
            нужно купить: {missing.map(ingredientName).join(', ')}
          </ThemedText>
        ) : null}

        {urgent.length > 0 ? (
          <View style={styles.urgent}>
            <Ionicons name="hourglass-outline" size={14} color={theme.warning} />
            <ThemedText type="small" themeColor="warning" style={styles.grow}>
              {urgentLine(urgent)}
            </ThemedText>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  body: {
    gap: Spacing.two,
    padding: Spacing.three,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  urgent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  grow: {
    flex: 1,
  },
});
