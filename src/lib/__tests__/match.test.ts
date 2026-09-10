import { RECIPES, type Recipe } from '@/data/recipes';

import { matchRecipe, matchRecipes } from '../match';

const OPTIONS = { assumePantry: true };

function findGroup(groups: ReturnType<typeof matchRecipes>, recipeId: string) {
  if (groups.ready.some((match) => match.recipe.id === recipeId)) return 'ready';
  if (groups.missingOne.some((match) => match.recipe.id === recipeId)) return 'missingOne';
  if (groups.almost.some((match) => match.recipe.id === recipeId)) return 'almost';
  return 'none';
}

describe('matchRecipes', () => {
  it('кладёт омлет в «можно готовить», когда есть яйца, молоко и масло', () => {
    const groups = matchRecipes(new Set(['egg', 'milk', 'butter']), OPTIONS);

    expect(findGroup(groups, 'omlet')).toBe('ready');
  });

  it('переносит омлет в «не хватает одного», когда кончились яйца', () => {
    const groups = matchRecipes(new Set(['milk', 'butter']), OPTIONS);

    expect(findGroup(groups, 'omlet')).toBe('missingOne');
    const match = groups.missingOne.find((candidate) => candidate.recipe.id === 'omlet');
    expect(match?.missing).toEqual(['egg']);
  });

  it('не считает необязательные ингредиенты недостающими', () => {
    // У омлета сыр помечен optional — без него рецепт всё равно готов.
    const match = matchRecipe(recipe('omlet'), new Set(['egg', 'milk', 'butter']), OPTIONS);

    expect(match.missing).toEqual([]);
    expect(match.have).not.toContain('cheese');
  });

  it('без допущения о базовых продуктах требует соль и масло явно', () => {
    const available = new Set(['egg', 'milk', 'butter']);

    expect(matchRecipe(recipe('omlet'), available, { assumePantry: true }).missing).toEqual([]);
    expect(matchRecipe(recipe('omlet'), available, { assumePantry: false }).missing).toEqual([
      'salt',
    ]);
  });

  it('не предлагает рецепты, из которых не используется ничего', () => {
    const groups = matchRecipes(new Set(['egg']), OPTIONS);
    const all = [...groups.ready, ...groups.missingOne, ...groups.almost];

    for (const match of all) {
      expect(match.have.length).toBeGreaterThan(0);
    }
  });

  it('на пустом холодильнике не предлагает ничего', () => {
    const groups = matchRecipes(new Set(), OPTIONS);

    expect(groups.ready).toEqual([]);
    expect(groups.missingOne).toEqual([]);
    expect(groups.almost).toEqual([]);
  });

  it('не дублирует рецепт между секциями', () => {
    const groups = matchRecipes(new Set(['egg', 'milk', 'flour', 'tomato', 'potato']), OPTIONS);
    const ids = [...groups.ready, ...groups.missingOne, ...groups.almost].map(
      (match) => match.recipe.id,
    );

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('сортирует по числу задействованных продуктов, потом по времени', () => {
    const groups = matchRecipes(
      new Set(['egg', 'milk', 'butter', 'cheese', 'tomato', 'onion', 'bell_pepper', 'potato']),
      OPTIONS,
    );

    for (let index = 1; index < groups.ready.length; index += 1) {
      const previous = groups.ready[index - 1];
      const current = groups.ready[index];

      if (previous.have.length === current.have.length) {
        expect(previous.recipe.timeMinutes).toBeLessThanOrEqual(current.recipe.timeMinutes);
      } else {
        expect(previous.have.length).toBeGreaterThan(current.have.length);
      }
    }
  });
});

function recipe(id: string): Recipe {
  const found = RECIPES.find((candidate) => candidate.id === id);
  if (!found) {
    throw new Error(`Рецепт ${id} не найден`);
  }
  return found;
}
