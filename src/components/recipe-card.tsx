import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ingredientName } from '@/data/ingredients';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatMinutes, formatProducts } from '@/lib/format';
import type { RecipeMatch } from '@/lib/match';

import { ThemedText } from './themed-text';

type RecipeCardProps = {
  match: RecipeMatch;
  onPress: (recipeId: string) => void;
};

export function RecipeCard({ match, onPress }: RecipeCardProps) {
  const theme = useTheme();
  const { recipe, have, missing } = match;

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

      {missing.length > 0 ? (
        <ThemedText type="small" style={{ color: theme.warning }}>
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
});
