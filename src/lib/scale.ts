import type { Unit } from '@/data/ingredients';
import type { Recipe } from '@/data/recipes';

export const MIN_SERVINGS = 1;
export const MAX_SERVINGS = 12;

/**
 * Пересчёт количества на другое число порций.
 *
 * Дробные граммы на кухне бесполезны: 266 г фарша никто не отмерит. Поэтому
 * чем больше число, тем крупнее округление, а штуки и упаковки округляются
 * до половины — половина луковицы существует, треть яйца нет.
 */
export function scaleAmount(amount: number, unit: Unit | null | undefined, factor: number): number {
  const value = amount * factor;

  if (unit === 'г' || unit === 'мл') {
    if (value >= 200) {
      return Math.round(value / 10) * 10;
    }
    if (value >= 50) {
      return Math.round(value / 5) * 5;
    }
    return Math.max(1, Math.round(value));
  }

  return Math.max(0.5, Math.round(value * 2) / 2);
}

/**
 * Копия рецепта с количествами на нужное число порций. Шаги не трогаем:
 * переписывать числа внутри текста — значит ошибаться в половине случаев,
 * поэтому экран честно предупреждает, что в шагах количества исходные.
 */
export function scaleRecipe(recipe: Recipe, servings: number): Recipe {
  const factor = servings / recipe.servings;
  if (factor === 1) {
    return recipe;
  }

  return {
    ...recipe,
    servings,
    ingredients: recipe.ingredients.map((ingredient) =>
      ingredient.amount === undefined
        ? ingredient
        : { ...ingredient, amount: scaleAmount(ingredient.amount, ingredient.unit, factor) },
    ),
  };
}
