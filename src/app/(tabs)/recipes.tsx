import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, SectionList, StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { RecipeCard } from '@/components/recipe-card';
import { RecipeFilterBar } from '@/components/recipe-filter-bar';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { RECIPES } from '@/data/recipes';
import { useTheme } from '@/hooks/use-theme';
import { matchRecipe, matchRecipes, sortMatches, type RecipeMatch } from '@/lib/match';
import { EMPTY_FILTERS, filterRecipes, isFilterActive } from '@/lib/recipe-filter';
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
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const searching = isFilterActive(filters);

  const foundRecipes = useMemo(() => filterRecipes(RECIPES, filters), [filters]);

  const sections = useMemo<Section[]>(() => {
    const available = availableIds(items);
    const options = { assumePantry, expiring: expiringSoon(items) };

    // С фильтрами показываем всю базу, а не только то, что собирается из
    // холодильника: человек ищет рецепт, а не подбор под содержимое полки.
    if (searching) {
      const found = sortMatches(foundRecipes.map((recipe) => matchRecipe(recipe, available, options)));
      return found.length > 0 ? [{ title: `Найдено: ${found.length}`, data: found }] : [];
    }

    const groups = matchRecipes(available, options);
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
  }, [items, assumePantry, foundRecipes, searching]);

  if (!hydrated) {
    return <View style={[styles.screen, { backgroundColor: theme.background }]} />;
  }

  const emptyState = searching ? (
    <EmptyState
      icon="search-outline"
      title="Ничего не нашлось"
      description="Попробуйте другое слово или снимите часть фильтров — в базе 500 рецептов."
    />
  ) : items.length === 0 ? (
    <EmptyState
      icon="basket-outline"
      title="Сначала наполните холодильник"
      description="Продиктуйте продукты на вкладке «Холодильник» — здесь появятся рецепты из того, что есть. Или найдите любой рецепт через поиск."
    />
  ) : (
    <EmptyState
      icon="search-outline"
      title="Пока ничего не подобралось"
      description="Из этих продуктов не собирается ни один рецепт целиком. Добавьте ещё пару позиций — например, яйца, лук или макароны."
    />
  );

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <SectionList
        sections={sections}
        keyExtractor={(match) => match.recipe.id}
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListHeaderComponent={<RecipeFilterBar filters={filters} onChange={setFilters} />}
        ListEmptyComponent={emptyState}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <ThemedText
                type="smallBold"
                themeColor={section.hint ? 'warning' : 'textSecondary'}
                style={styles.sectionTitle}>
                {section.title.toUpperCase()}
              </ThemedText>
              {searching ? (
                <Pressable
                  accessibilityRole="button"
                  hitSlop={Spacing.two}
                  onPress={() => setFilters(EMPTY_FILTERS)}>
                  <ThemedText type="smallBold" themeColor="accent">
                    Сбросить
                  </ThemedText>
                </Pressable>
              ) : null}
            </View>
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
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  sectionTitle: {
    letterSpacing: 0.6,
  },
  separator: {
    height: Spacing.two,
  },
});
