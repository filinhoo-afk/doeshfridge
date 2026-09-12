import { ingredientName } from '@/data/ingredients';
import type { Recipe } from '@/data/recipes';

import { normalize, stem } from './normalize';

export type RecipeFilters = {
  /** Строка поиска: по названию, описанию, тегам и продуктам. */
  query: string;
  /** Выбранные теги — рецепт должен подходить сразу под все. */
  tags: string[];
  /** Верхняя граница времени приготовления в минутах. */
  maxMinutes: number | null;
};

export const EMPTY_FILTERS: RecipeFilters = { query: '', tags: [], maxMinutes: null };

/** Теги для быстрых кнопок: сначала вид блюда, потом ограничения и способ. */
export const FILTER_TAGS = [
  'завтрак',
  'суп',
  'салат',
  'ужин',
  'гарнир',
  'закуска',
  'выпечка',
  'вегетарианское',
  'постное',
  'пп',
  'в духовке',
  'на сковороде',
];

/** Пороги для фильтра по времени. */
export const TIME_LIMITS = [15, 30, 60];

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

export function filterRecipes(recipes: Recipe[], filters: RecipeFilters): Recipe[] {
  const queryWords = normalize(filters.query).split(' ').filter(Boolean);

  return recipes.filter((recipe) => {
    if (filters.maxMinutes !== null && recipe.timeMinutes > filters.maxMinutes) {
      return false;
    }
    if (!filters.tags.every((tag) => recipe.tags.includes(tag))) {
      return false;
    }
    return queryWords.length === 0 || matchesQuery(recipe, queryWords);
  });
}
