import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { RecipeCard } from '@/components/recipe-card';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { getRecipe } from '@/data/recipes';
import { useTheme } from '@/hooks/use-theme';
import { plural } from '@/lib/format';
import { matchRecipe, type RecipeMatch } from '@/lib/match';
import { frequentlyCooked, useCookbook } from '@/store/cookbook';
import { availableIds, expiringSoon, useFridge } from '@/store/fridge';

type Entry = { key: string; match: RecipeMatch; note?: string };
type Section = { title: string; data: Entry[] };

export default function FavoritesScreen() {
  const router = useRouter();
  const theme = useTheme();

  const favorites = useCookbook((state) => state.favorites);
  const cooked = useCookbook((state) => state.cooked);
  const cookbookReady = useCookbook((state) => state.hydrated);
  const items = useFridge((state) => state.items);
  const assumePantry = useFridge((state) => state.assumePantry);
  const fridgeReady = useFridge((state) => state.hydrated);

  const favoriteIds = useMemo(() => new Set(favorites), [favorites]);

  const sections = useMemo<Section[]>(() => {
    // Карточки считаются по холодильнику: сразу видно, чего не хватает, —
    // по избранному удобно составлять список покупок.
    const available = availableIds(items);
    const options = { assumePantry, expiring: expiringSoon(items) };
    const entry = (section: string, recipeId: string, note?: string): Entry[] => {
      const recipe = getRecipe(recipeId);
      return recipe
        ? [{ key: `${section}:${recipeId}`, match: matchRecipe(recipe, available, options), note }]
        : [];
    };

    return [
      { title: 'Избранное', data: favorites.flatMap((id) => entry('favorite', id)) },
      {
        title: 'Часто готовлю',
        data: frequentlyCooked(cooked).flatMap((record) =>
          entry('frequent', record.recipeId, `готовили ${record.count} ${plural(record.count, 'раз', 'раза', 'раз')}`),
        ),
      },
    ].filter((section) => section.data.length > 0);
  }, [favorites, cooked, items, assumePantry]);

  if (!cookbookReady || !fridgeReady) {
    return <View style={[styles.screen, { backgroundColor: theme.background }]} />;
  }

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <SectionList
        sections={sections}
        keyExtractor={(entry) => entry.key}
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={
          <EmptyState
            icon="heart-outline"
            title="Пока пусто"
            description="Отмечайте рецепты сердечком на их странице — они соберутся здесь. А рецепты, которые вы приготовите хотя бы дважды, появятся в «Часто готовлю»."
          />
        }
        renderSectionHeader={({ section }) => (
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionHeader}>
            {section.title.toUpperCase()}
          </ThemedText>
        )}
        renderItem={({ item }) => (
          <RecipeCard
            match={item.match}
            note={item.note}
            favorite={favoriteIds.has(item.match.recipe.id)}
            onPress={(id) => router.push(`/recipe/${id}`)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.four,
  },
  sectionHeader: {
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
    letterSpacing: 0.6,
  },
  separator: {
    height: Spacing.two,
  },
});
