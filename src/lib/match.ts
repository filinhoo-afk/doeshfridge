import { isPantry } from '@/data/ingredients';
import { RECIPES, type Recipe } from '@/data/recipes';

export type UrgentIngredient = {
  ingredientId: string;
  /** Дней до ближайшего срока: 0 — сегодня. */
  days: number;
};

export type RecipeMatch = {
  recipe: Recipe;
  /** Обязательные ингредиенты, которые есть в холодильнике. */
  have: string[];
  /** Обязательные ингредиенты, которых не хватает. */
  missing: string[];
  /** Продукты рецепта из холодильника, которые скоро испортятся, — ближайшие первыми. */
  urgent: UrgentIngredient[];
};

export type MatchGroups = {
  /** Используют то, что скоро испортится, и готовятся сейчас или без одного продукта. */
  urgent: RecipeMatch[];
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
  /**
   * id продукта → дней до ближайшего срока. Только то, что скоро испортится:
   * отбор делает вызывающий код, см. `expiringSoon` в store/fridge.ts.
   */
  expiring?: ReadonlyMap<string, number>;
};

const ALMOST_MAX_MISSING = 3;

/**
 * Сколько продуктов может не хватать рецепту, чтобы он всё ещё поднимался
 * в «Пора доесть». Если докупать надо много, скоропортящееся он не спасёт.
 */
const URGENT_MAX_MISSING = 1;

/**
 * Считает совпадение одного рецепта с содержимым холодильника.
 * Необязательные ингредиенты не мешают рецепту попасть в «можно готовить
 * сейчас», но срочность учитывают: сыр, который истекает завтра, доедается
 * в омлете так же, как и обязательные яйца.
 */
export function matchRecipe(
  recipe: Recipe,
  available: ReadonlySet<string>,
  options: MatchOptions,
): RecipeMatch {
  const have: string[] = [];
  const missing: string[] = [];
  const urgent: UrgentIngredient[] = [];

  for (const ingredient of recipe.ingredients) {
    const { ingredientId } = ingredient;

    const days = options.expiring?.get(ingredientId);
    if (days !== undefined && available.has(ingredientId)) {
      urgent.push({ ingredientId, days });
    }

    if (ingredient.optional) {
      continue;
    }
    if (options.assumePantry && isPantry(ingredientId)) {
      continue;
    }
    if (available.has(ingredientId)) {
      have.push(ingredientId);
    } else {
      missing.push(ingredientId);
    }
  }

  urgent.sort((a, b) => a.days - b.days);
  return { recipe, have, missing, urgent };
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

/**
 * Наверху — то, что испортится раньше всего. При равной срочности готовые
 * рецепты идут раньше тех, где чего-то не хватает, затем — спасающие больше.
 */
function compareUrgent(a: RecipeMatch, b: RecipeMatch): number {
  return (
    a.urgent[0].days - b.urgent[0].days ||
    a.missing.length - b.missing.length ||
    b.urgent.length - a.urgent.length ||
    compareMatches(a, b)
  );
}

export function matchRecipes(
  available: ReadonlySet<string>,
  options: MatchOptions,
  recipes: Recipe[] = RECIPES,
): MatchGroups {
  const urgent: RecipeMatch[] = [];
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

    if (match.urgent.length > 0 && match.missing.length <= URGENT_MAX_MISSING) {
      urgent.push(match);
    } else if (match.missing.length === 0) {
      ready.push(match);
    } else if (match.missing.length === 1) {
      missingOne.push(match);
    } else if (match.missing.length <= ALMOST_MAX_MISSING) {
      almost.push(match);
    }
  }

  return {
    urgent: urgent.sort(compareUrgent),
    ready: ready.sort(compareMatches),
    missingOne: missingOne.sort(compareMatches),
    almost: almost.sort(compareMatches),
  };
}
