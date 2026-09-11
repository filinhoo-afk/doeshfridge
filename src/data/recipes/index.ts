import { BAKING } from './baking';
import { BREAKFAST } from './breakfast';
import { FISH } from './fish';
import { GRAINS } from './grains';
import { MEAT } from './meat';
import { POULTRY } from './poultry';
import { RUSSIAN_1 } from './russian-1';
import { RUSSIAN_2 } from './russian-2';
import { RUSSIAN_3 } from './russian-3';
import { SALADS } from './salads';
import { SNACKS } from './snacks';
import { SOUPS } from './soups';
import type { Recipe } from './types';
import { VEGETABLES } from './vegetables';

export type { Recipe, RecipeIngredient } from './types';

/**
 * База рецептов по файлам категорий. Одним файлом 500 подробных рецептов
 * весили бы около 2 МБ: такой неудобно править, а хук перед отправкой на GitHub
 * останавливает файлы больше 1 МБ.
 */
export const RECIPES: Recipe[] = [
  ...BREAKFAST,
  ...SOUPS,
  ...POULTRY,
  ...MEAT,
  ...FISH,
  ...GRAINS,
  ...VEGETABLES,
  ...SALADS,
  ...BAKING,
  ...SNACKS,
  ...RUSSIAN_1,
  ...RUSSIAN_2,
  ...RUSSIAN_3,
];

export const RECIPE_BY_ID: ReadonlyMap<string, Recipe> = new Map(
  RECIPES.map((recipe) => [recipe.id, recipe]),
);

export function getRecipe(id: string): Recipe | undefined {
  return RECIPE_BY_ID.get(id);
}
