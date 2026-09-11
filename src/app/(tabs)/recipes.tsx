import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { RecipeCard } from '@/components/recipe-card';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { matchRecipes, type RecipeMatch } from '@/lib/match';
import { useCookbook } from '@/store/cookbook';
import { availableIds, expiringSoon, useFridge } from '@/store/fridge';

type Section = { title: string; hint?: string; data: RecipeMatch[] };

export default function RecipesScreen() {
  const router = useRouter();
  const theme = useTheme();
  const items = useFridge((state) => state.items);
  const assumePantry = useFridge((state) => state.assumePantry);
  const hydrated = useFridge((state) => state.hydrated);
  const favorites = useCookbook((state) => state.favorites);
  const favoriteIds = useMemo(() => new Set(favorites), [favorites]);

  const sections = useMemo<Section[]>(() => {
    const groups = matchRecipes(availableIds(items), {
      assumePantry,
      expiring: expiringSoon(items),
    });

    return [
      {
        title: 'Пора доесть',
        hint: 'Эти рецепты используют то, что скоро испортится',
        data: groups.urgent,
      },
      { title: 'Можно готовить сейчас', data: groups.ready },
      { title: 'Не хватает одного', data: groups.missingOne },
      { title: 'Почти получается', data: groups.almost },
    ].filter((section) => section.data.length > 0);
  }, [items, assumePantry]);

  if (!hydrated) {
    return <View style={[styles.screen, { backgroundColor: theme.background }]} />;
  }

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <SectionList
        sections={sections}
        keyExtractor={(match) => match.recipe.id}
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={
          items.length === 0 ? (
            <EmptyState
              icon="basket-outline"
              title="Сначала наполните холодильник"
              description="Продиктуйте продукты на вкладке «Холодильник» — здесь появятся рецепты из того, что есть."
            />
          ) : (
            <EmptyState
              icon="search-outline"
              title="Пока ничего не подобралось"
              description="Из этих продуктов не собирается ни один рецепт целиком. Добавьте ещё пару позиций — например, яйца, лук или макароны."
            />
          )
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <ThemedText
              type="smallBold"
              themeColor={section.hint ? 'warning' : 'textSecondary'}
              style={styles.sectionTitle}>
              {section.title.toUpperCase()}
            </ThemedText>
            {section.hint ? (
              <ThemedText type="small" themeColor="textSecondary">
                {section.hint}
              </ThemedText>
            ) : null}
          </View>
        )}
        renderItem={({ item }) => (
          <RecipeCard
            match={item}
            favorite={favoriteIds.has(item.recipe.id)}
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
    gap: Spacing.half,
  },
  sectionTitle: {
    letterSpacing: 0.6,
  },
  separator: {
    height: Spacing.two,
  },
});
