import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ingredientName } from '@/data/ingredients';
import { formatDaysLeft } from '@/data/shelf-life';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatMinutes, formatProducts } from '@/lib/format';
import type { RecipeMatch, UrgentIngredient } from '@/lib/match';

import { RecipeThumb } from './recipe-photo';
import { ThemedText } from './themed-text';

type RecipeCardProps = {
  match: RecipeMatch;
  onPress: (recipeId: string) => void;
  /** Показать сердечко у названия. */
  favorite?: boolean;
  /** Строка-пометка внизу, например «готовили 5 раз». */
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

export function RecipeCard({ match, onPress, favorite = false, note }: RecipeCardProps) {
  const theme = useTheme();
  const { recipe, have, missing, urgent } = match;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(recipe.id)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.7 : 1 },
      ]}>
      <View style={styles.top}>
        <RecipeThumb recipeId={recipe.id} />
        <View style={[styles.body, styles.grow]}>
          <View style={styles.titleRow}>
            <ThemedText style={[styles.title, styles.grow]}>{recipe.title}</ThemedText>
            {favorite ? (
              <Ionicons name="heart" size={16} color={theme.accent} accessibilityLabel="В избранном" />
            ) : null}
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {recipe.description}
          </ThemedText>
        </View>
      </View>

      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={14} color={theme.textSecondary} />
          <ThemedText type="small" themeColor="textSecondary">
            {formatMinutes(recipe.timeMinutes)}
          </ThemedText>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="basket-outline" size={14} color={theme.textSecondary} />
          <ThemedText type="small" themeColor="textSecondary">
            задействует {formatProducts(have.length)}
          </ThemedText>
        </View>
        {note ? (
          <View style={styles.metaItem}>
            <Ionicons name="repeat-outline" size={14} color={theme.textSecondary} />
            <ThemedText type="small" themeColor="textSecondary">
              {note}
            </ThemedText>
          </View>
        ) : null}
      </View>

      {urgent.length > 0 ? (
        <View style={styles.metaItem}>
          <Ionicons name="hourglass-outline" size={14} color={theme.warning} />
          <ThemedText type="small" themeColor="warning" style={styles.grow}>
            {urgentLine(urgent)}
          </ThemedText>
        </View>
      ) : null}

      {missing.length > 0 ? (
        <ThemedText type="small" themeColor="warning">
          не хватает: {missing.map(ingredientName).join(', ')}
        </ThemedText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.one,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  top: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  body: {
    gap: Spacing.one,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    fontWeight: '700',
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    paddingTop: Spacing.one,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  grow: {
    flex: 1,
  },
});
