import { BAKING } from './baking';
import { BREAKFAST } from './breakfast';
import { FISH } from './fish';
import { GRAINS } from './grains';
import { LIGHT_1 } from './light-1';
import { LIGHT_2 } from './light-2';
import { LIGHT_3 } from './light-3';
import { LIGHT_4 } from './light-4';
import { LIGHT_5 } from './light-5';
import { MEAT } from './meat';
import { POULTRY } from './poultry';
import { RUSSIAN_1 } from './russian-1';
import { RUSSIAN_2 } from './russian-2';
import { RUSSIAN_3 } from './russian-3';
import { RUSSIAN_4 } from './russian-4';
import { SALADS } from './salads';
import { SNACKS } from './snacks';
import { SOUPS } from './soups';
import type { Recipe } from './types';
import { VEGETABLES } from './vegetables';
import { WORLD_1 } from './world-1';
import { WORLD_2 } from './world-2';
import { WORLD_3 } from './world-3';
import { WORLD_4 } from './world-4';
import { WORLD_5 } from './world-5';

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
  ...RUSSIAN_4,
  ...WORLD_1,
  ...WORLD_2,
  ...WORLD_3,
  ...WORLD_4,
  ...WORLD_5,
  ...LIGHT_1,
  ...LIGHT_2,
  ...LIGHT_3,
  ...LIGHT_4,
  ...LIGHT_5,
];

export const RECIPE_BY_ID: ReadonlyMap<string, Recipe> = new Map(
  RECIPES.map((recipe) => [recipe.id, recipe]),
);

export function getRecipe(id: string): Recipe | undefined {
  return RECIPE_BY_ID.get(id);
}
