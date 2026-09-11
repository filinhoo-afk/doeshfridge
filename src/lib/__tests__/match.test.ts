import { RECIPES, type Recipe } from '@/data/recipes';

import { matchRecipe, matchRecipes, type MatchGroups } from '../match';

const OPTIONS = { assumePantry: true };
const SECTIONS = ['urgent', 'ready', 'missingOne', 'almost'] as const;

function findGroup(groups: MatchGroups, recipeId: string) {
  return SECTIONS.find((key) => groups[key].some((match) => match.recipe.id === recipeId)) ?? 'none';
}

function ids(groups: MatchGroups, key: (typeof SECTIONS)[number]): string[] {
  return groups[key].map((match) => match.recipe.id);
}

function recipe(id: string): Recipe {
  const found = RECIPES.find((candidate) => candidate.id === id);
  if (!found) {
    throw new Error(`Рецепт ${id} не найден`);
  }
  return found;
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

    for (const key of SECTIONS) {
      for (const match of groups[key]) {
        expect(match.have.length).toBeGreaterThan(0);
      }
    }
  });

  it('на пустом холодильнике не предлагает ничего', () => {
    const groups = matchRecipes(new Set(), OPTIONS);

    for (const key of SECTIONS) {
      expect(groups[key]).toEqual([]);
    }
  });

  it('не дублирует рецепт между разделами', () => {
    const groups = matchRecipes(new Set(['egg', 'milk', 'flour', 'tomato', 'potato']), {
      ...OPTIONS,
      expiring: new Map([
        ['egg', 1],
        ['tomato', 0],
      ]),
    });
    const all = SECTIONS.flatMap((key) => ids(groups, key));

    expect(new Set(all).size).toBe(all.length);
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

describe('«Пора доесть»', () => {
  it('поднимает рецепт, который использует скоропортящийся продукт', () => {
    const groups = matchRecipes(new Set(['egg', 'milk', 'butter']), {
      ...OPTIONS,
      expiring: new Map([['egg', 1]]),
    });

    expect(findGroup(groups, 'omlet')).toBe('urgent');
    expect(groups.urgent.find((match) => match.recipe.id === 'omlet')?.urgent).toEqual([
      { ingredientId: 'egg', days: 1 },
    ]);
  });

  it('без скоропортящегося раскладывает всё как раньше', () => {
    const groups = matchRecipes(new Set(['egg', 'milk', 'butter']), {
      ...OPTIONS,
      expiring: new Map(),
    });

    expect(groups.urgent).toEqual([]);
    expect(findGroup(groups, 'omlet')).toBe('ready');
  });

  it('учитывает необязательный продукт: сыр в омлете доедается так же', () => {
    const groups = matchRecipes(new Set(['egg', 'milk', 'butter', 'cheese']), {
      ...OPTIONS,
      expiring: new Map([['cheese', 2]]),
    });

    expect(findGroup(groups, 'omlet')).toBe('urgent');
  });

  it('ставит выше то, что испортится раньше', () => {
    // Яичница спасает помидоры, которые истекают сегодня, омлет — только яйца.
    const groups = matchRecipes(new Set(['egg', 'milk', 'butter', 'tomato']), {
      ...OPTIONS,
      expiring: new Map([
        ['egg', 2],
        ['tomato', 0],
      ]),
    });
    const order = ids(groups, 'urgent');

    expect(order.indexOf('yaichnica_pomidory')).toBeLessThan(order.indexOf('omlet'));
    for (let index = 1; index < groups.urgent.length; index += 1) {
      expect(groups.urgent[index - 1].urgent[0].days).toBeLessThanOrEqual(
        groups.urgent[index].urgent[0].days,
      );
    }
  });

  it('при равной срочности ставит готовые рецепты раньше тех, где чего-то не хватает', () => {
    // Яичнице хватает всего, омлету не хватает молока; обе спасают завтрашние яйца.
    const groups = matchRecipes(new Set(['egg', 'butter', 'tomato']), {
      ...OPTIONS,
      expiring: new Map([['egg', 1]]),
    });
    const order = ids(groups, 'urgent');

    expect(order).toContain('omlet');
    expect(order.indexOf('yaichnica_pomidory')).toBeLessThan(order.indexOf('omlet'));
  });

  it('оставляет в «почти получается» рецепт, которому не хватает двух продуктов', () => {
    const groups = matchRecipes(new Set(['egg']), {
      ...OPTIONS,
      expiring: new Map([['egg', 1]]),
    });

    expect(findGroup(groups, 'omlet')).toBe('almost');
    // Срочность при этом известна — карточка всё равно подскажет про яйца.
    expect(groups.almost.find((match) => match.recipe.id === 'omlet')?.urgent).toHaveLength(1);
  });
});
