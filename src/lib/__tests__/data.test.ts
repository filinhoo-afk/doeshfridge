import { INGREDIENTS, INGREDIENT_BY_ID } from '@/data/ingredients';
import { RECIPES } from '@/data/recipes';

import { lookupPhrase } from '../ingredient-index';
import { tokenize } from '../normalize';

describe('справочник ингредиентов', () => {
  it('не содержит повторяющихся id', () => {
    const ids = INGREDIENTS.map((ingredient) => ingredient.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('находит каждый продукт по его же названию и по каждой форме', () => {
    for (const ingredient of INGREDIENTS) {
      for (const phrase of [ingredient.name, ...ingredient.forms]) {
        expect({ phrase, id: lookupPhrase(tokenize(phrase)) }).toEqual({
          phrase,
          id: ingredient.id,
        });
      }
    }
  });
});

describe('база рецептов', () => {
  it('не содержит повторяющихся id', () => {
    const ids = RECIPES.map((recipe) => recipe.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ссылается только на существующие ингредиенты', () => {
    const unknown = RECIPES.flatMap((recipe) =>
      recipe.ingredients
        .filter((ingredient) => !INGREDIENT_BY_ID.has(ingredient.ingredientId))
        .map((ingredient) => `${recipe.id}: ${ingredient.ingredientId}`),
    );

    expect(unknown).toEqual([]);
  });

  it('не повторяет один ингредиент внутри рецепта', () => {
    for (const recipe of RECIPES) {
      const ids = recipe.ingredients.map((ingredient) => ingredient.ingredientId);
      expect({ recipe: recipe.id, count: new Set(ids).size }).toEqual({
        recipe: recipe.id,
        count: ids.length,
      });
    }
  });

  it('в каждом рецепте есть шаги и хотя бы один обязательный ингредиент', () => {
    for (const recipe of RECIPES) {
      expect(recipe.steps.length).toBeGreaterThan(0);
      expect(
        recipe.ingredients.filter((ingredient) => !ingredient.optional).length,
      ).toBeGreaterThan(0);
    }
  });
});

describe('подробные рецепты', () => {
  it('у каждого рецепта есть посуда, не меньше 4 шагов и советы', () => {
    for (const recipe of RECIPES) {
      expect({
        id: recipe.id,
        equipment: (recipe.equipment ?? []).length > 0,
        steps: recipe.steps.length >= 4,
        tips: (recipe.tips ?? []).length > 0,
      }).toEqual({ id: recipe.id, equipment: true, steps: true, tips: true });
    }
  });
});
