import { ingredientName } from '@/data/ingredients';
import type { Recipe } from '@/data/recipes';

import { normalize, stem } from './normalize';

export type RecipeFilters = {
  /** Строка поиска: по названию, описанию, тегам и продуктам. */
  query: string;
  /** Выбранные теги: «или» внутри группы, «и» между группами (см. FILTER_GROUPS). */
  tags: string[];
  /** Верхняя граница времени приготовления в минутах. */
  maxMinutes: number | null;
};

export const EMPTY_FILTERS: RecipeFilters = { query: '', tags: [], maxMinutes: null };

export type FilterGroup = { title: string; tags: string[] };

/**
 * Теги в окне фильтров, по группам. Внутри группы выбор складывается через «или»:
 * «завтрак» и «ужин» — это рецепты для любого из них. Между группами — через «и»:
 * «суп» и «постное» — только постные супы.
 */
export const FILTER_GROUPS: FilterGroup[] = [
  { title: 'Когда', tags: ['завтрак', 'обед', 'ужин'] },
  { title: 'Блюдо', tags: ['суп', 'салат', 'гарнир', 'закуска', 'выпечка'] },
  { title: 'Питание', tags: ['вегетарианское', 'постное', 'пп'] },
  { title: 'Как готовить', tags: ['на сковороде', 'в духовке'] },
];

/** Пороги для фильтра по времени. */
export const TIME_LIMITS = [15, 30, 60];

/** Сколько фильтров выбрано в окне — для счётчика на кнопке. Поиск не в счёт. */
export function countSelectedFilters(filters: RecipeFilters): number {
  return filters.tags.length + (filters.maxMinutes === null ? 0 : 1);
}

export function isFilterActive(filters: RecipeFilters): boolean {
  return filters.query.trim().length > 0 || filters.tags.length > 0 || filters.maxMinutes !== null;
}

/**
 * Текст рецепта для поиска: название, описание, теги и названия продуктов.
 * Считается один раз на рецепт — при вводе каждой буквы перебираются все 500.
 */
const haystacks = new Map<string, { exact: string; stemmed: string }>();

function haystack(recipe: Recipe) {
  const cached = haystacks.get(recipe.id);
  if (cached) {
    return cached;
  }

  const words = normalize(
    [
      recipe.title,
      recipe.description,
      recipe.tags.join(' '),
      recipe.ingredients.map((ingredient) => ingredientName(ingredient.ingredientId)).join(' '),
    ].join(' '),
  ).split(' ');

  // Пробелы по краям: так `includes(' ' + слово)` находит начало слова, а не середину.
  const value = {
    exact: ` ${words.join(' ')} `,
    stemmed: ` ${words.map(stem).join(' ')} `,
  };
  haystacks.set(recipe.id, value);
  return value;
}

/** Совпадение по началу слова: «помид» находит «помидоры», «супы» — «суп». */
function matchesQuery(recipe: Recipe, queryWords: string[]): boolean {
  const { exact, stemmed } = haystack(recipe);
  return queryWords.every(
    (word) => exact.includes(` ${word}`) || stemmed.includes(` ${stem(word)}`),
  );
}

/** Выбранные теги по группам; тег вне групп становится отдельной группой. */
function groupSelectedTags(tags: string[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const tag of tags) {
    const key = FILTER_GROUPS.find((group) => group.tags.includes(tag))?.title ?? tag;
    groups.set(key, [...(groups.get(key) ?? []), tag]);
  }
  return [...groups.values()];
}

export function filterRecipes(recipes: Recipe[], filters: RecipeFilters): Recipe[] {
  const queryWords = normalize(filters.query).split(' ').filter(Boolean);
  const tagGroups = groupSelectedTags(filters.tags);

  return recipes.filter((recipe) => {
    if (filters.maxMinutes !== null && recipe.timeMinutes > filters.maxMinutes) {
      return false;
    }
    if (!tagGroups.every((group) => group.some((tag) => recipe.tags.includes(tag)))) {
      return false;
    }
    return queryWords.length === 0 || matchesQuery(recipe, queryWords);
  });
}
