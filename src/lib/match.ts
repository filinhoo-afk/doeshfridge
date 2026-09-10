import { isPantry } from '@/data/ingredients';
import { RECIPES, type Recipe } from '@/data/recipes';

export type RecipeMatch = {
  recipe: Recipe;
  /** Обязательные ингредиенты, которые есть в холодильнике. */
  have: string[];
  /** Обязательные ингредиенты, которых не хватает. */
  missing: string[];
};

export type MatchGroups = {
  /** Всё есть — можно готовить прямо сейчас. */
  ready: RecipeMatch[];
  /** Не хватает ровно одного продукта. */
  missingOne: RecipeMatch[];
  /** Не хватает двух-трёх. */
  almost: RecipeMatch[];
};

export type MatchOptions = {
  /** Считать соль, муку, масло и прочую базу всегда имеющейся. */
  assumePantry: boolean;
};

const ALMOST_MAX_MISSING = 3;

/**
 * Считает совпадение одного рецепта с содержимым холодильника.
 * Необязательные ингредиенты не учитываются вовсе — они не должны мешать
 * рецепту попасть в «можно готовить сейчас».
 */
export function matchRecipe(
  recipe: Recipe,
  available: ReadonlySet<string>,
  options: MatchOptions,
): RecipeMatch {
  const have: string[] = [];
  const missing: string[] = [];

  for (const ingredient of recipe.ingredients) {
    if (ingredient.optional) {
      continue;
    }
    if (options.assumePantry && isPantry(ingredient.ingredientId)) {
      continue;
    }
    if (available.has(ingredient.ingredientId)) {
      have.push(ingredient.ingredientId);
    } else {
      missing.push(ingredient.ingredientId);
    }
  }

  return { recipe, have, missing };
}

/** Сначала те, где задействовано больше продуктов, затем — что быстрее готовится. */
function compareMatches(a: RecipeMatch, b: RecipeMatch): number {
  if (b.have.length !== a.have.length) {
    return b.have.length - a.have.length;
  }
  if (a.recipe.timeMinutes !== b.recipe.timeMinutes) {
    return a.recipe.timeMinutes - b.recipe.timeMinutes;
  }
  return a.recipe.title.localeCompare(b.recipe.title, 'ru');
}

export function matchRecipes(
  available: ReadonlySet<string>,
  options: MatchOptions,
  recipes: Recipe[] = RECIPES,
): MatchGroups {
  const ready: RecipeMatch[] = [];
  const missingOne: RecipeMatch[] = [];
  const almost: RecipeMatch[] = [];

  for (const recipe of recipes) {
    const match = matchRecipe(recipe, available, options);

    // Рецепт, из которого не используется ни один продукт холодильника,
    // предлагать бессмысленно — это просто случайный рецепт из базы.
    if (match.have.length === 0) {
      continue;
    }

    if (match.missing.length === 0) {
      ready.push(match);
    } else if (match.missing.length === 1) {
      missingOne.push(match);
    } else if (match.missing.length <= ALMOST_MAX_MISSING) {
      almost.push(match);
    }
  }

  return {
    ready: ready.sort(compareMatches),
    missingOne: missingOne.sort(compareMatches),
    almost: almost.sort(compareMatches),
  };
}
