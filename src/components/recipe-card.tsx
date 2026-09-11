import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ingredientName } from '@/data/ingredients';
import { formatDaysLeft } from '@/data/shelf-life';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatMinutes, formatProducts } from '@/lib/format';
import type { RecipeMatch, UrgentIngredient } from '@/lib/match';

import { ThemedText } from './themed-text';

type RecipeCardProps = {
  match: RecipeMatch;
  onPress: (recipeId: string) => void;
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

export function RecipeCard({ match, onPress }: RecipeCardProps) {
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
      <ThemedText style={styles.title}>{recipe.title}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {recipe.description}
      </ThemedText>

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
