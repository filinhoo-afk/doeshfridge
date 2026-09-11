import { getRecipe, type Recipe } from '@/data/recipes';
import { expiryInDays } from '@/data/shelf-life';
import { sortByExpiry, totalQuantity } from '@/lib/batches';
import {
  expiringSoon,
  itemsUsedByRecipe,
  migrateFridge,
  useFridge,
  type FridgeItem,
} from '@/store/fridge';

jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- штатный способ подменить нативный модуль в jest
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

function recipe(id: string): Recipe {
  const found = getRecipe(id);
  if (!found) {
    throw new Error(`Рецепт ${id} не найден`);
  }
  return found;
}

function item(ingredientId: string): FridgeItem | undefined {
  return useFridge.getState().items.find((candidate) => candidate.ingredientId === ingredientId);
}

function total(ingredientId: string): number | null | undefined {
  const found = item(ingredientId);
  return found ? totalQuantity(found.batches) : undefined;
}

/** Ставит срок на `count` единиц бессрочной партии продукта. */
function dateSome(ingredientId: string, days: number, count: number | null) {
  const found = item(ingredientId)!;
  const undated = found.batches.find((batch) => batch.expiresAt === null)!;
  useFridge.getState().setBatchExpiry(found.id, undated.id, expiryInDays(days), count);
}

beforeEach(() => {
  useFridge.setState({ items: [], assumePantry: true });
});

describe('addItems', () => {
  it('кладёт новый продукт одной партией без срока', () => {
    useFridge.getState().addItems([{ ingredientId: 'milk', quantity: 900, unit: 'мл' }]);

    expect(item('milk')?.batches).toEqual([
      expect.objectContaining({ quantity: 900, expiresAt: null }),
    ]);
  });

  it('складывает количество в бессрочную партию', () => {
    useFridge.getState().addItems([{ ingredientId: 'egg', quantity: 3, unit: 'шт' }]);
    useFridge.getState().addItems([{ ingredientId: 'egg', quantity: 2, unit: 'шт' }]);

    expect(useFridge.getState().items).toHaveLength(1);
    expect(item('egg')?.batches).toHaveLength(1);
    expect(total('egg')).toBe(5);
  });

  it('не плодит дубликаты при добавлении без количества', () => {
    useFridge.getState().addItems([{ ingredientId: 'milk', quantity: null, unit: null }]);
    useFridge.getState().addItems([{ ingredientId: 'milk', quantity: 500, unit: 'мл' }]);

    expect(useFridge.getState().items).toHaveLength(1);
    expect(total('milk')).toBe(500);
  });

  it('не трогает партии со сроком: докупленное ложится отдельно, без срока', () => {
    useFridge.getState().addItems([{ ingredientId: 'sausage', quantity: 1, unit: 'шт' }]);
    dateSome('sausage', 1, null);
    useFridge.getState().addItems([{ ingredientId: 'sausage', quantity: 2, unit: 'шт' }]);

    const batches = sortByExpiry(item('sausage')!.batches);
    expect(batches.map((batch) => [batch.quantity, batch.expiresAt !== null])).toEqual([
      [1, true],
      [2, false],
    ]);
  });
});

describe('setBatchExpiry', () => {
  it('раскладывает три палки колбасы по трём срокам', () => {
    useFridge.getState().addItems([{ ingredientId: 'sausage', quantity: 3, unit: 'шт' }]);
    dateSome('sausage', 1, 1);
    dateSome('sausage', 15, 1);
    dateSome('sausage', 30, null);

    const batches = sortByExpiry(item('sausage')!.batches);
    expect(batches.map((batch) => batch.quantity)).toEqual([1, 1, 1]);
    expect(batches.map((batch) => batch.expiresAt)).toEqual([
      expiryInDays(1),
      expiryInDays(15),
      expiryInDays(30),
    ]);
    expect(total('sausage')).toBe(3);
  });
});

describe('consumeRecipe', () => {
  it('вычитает израсходованное количество и оставляет остаток', () => {
    // Омлету нужно 4 яйца.
    useFridge.getState().addItems([{ ingredientId: 'egg', quantity: 10, unit: 'шт' }]);
    useFridge.getState().consumeRecipe(recipe('omlet'));

    expect(total('egg')).toBe(6);
  });

  it('убирает продукт, когда он израсходован полностью', () => {
    useFridge.getState().addItems([{ ingredientId: 'egg', quantity: 4, unit: 'шт' }]);
    useFridge.getState().consumeRecipe(recipe('omlet'));

    expect(item('egg')).toBeUndefined();
  });

  it('сначала расходует то, что испортится раньше', () => {
    useFridge.getState().addItems([{ ingredientId: 'egg', quantity: 10, unit: 'шт' }]);
    dateSome('egg', 1, 2);
    useFridge.getState().consumeRecipe(recipe('omlet'));

    // Два завтрашних яйца съедены первыми, из бессрочных взяли ещё два.
    expect(item('egg')!.batches).toEqual([expect.objectContaining({ quantity: 6, expiresAt: null })]);
  });

  it('при несовпадении единиц убирает только ближайшую партию', () => {
    // Оливье меряет колбасу в граммах, а в холодильнике она в штуках.
    useFridge.getState().addItems([{ ingredientId: 'sausage', quantity: 3, unit: 'шт' }]);
    dateSome('sausage', 1, 1);
    useFridge.getState().consumeRecipe(recipe('olivie'));

    expect(item('sausage')!.batches).toEqual([expect.objectContaining({ quantity: 2, expiresAt: null })]);
  });

  it('не трогает базовые продукты — их расход рецептами не указан', () => {
    // У шарлотки мука и сода идут без количества: без исключения для базовых
    // продуктов целая пачка муки исчезла бы после одного пирога.
    useFridge.getState().addItems([
      { ingredientId: 'flour', quantity: 1000, unit: 'г' },
      { ingredientId: 'apple', quantity: 6, unit: 'шт' },
    ]);
    useFridge.getState().consumeRecipe(recipe('sharlotka'));

    expect(total('flour')).toBe(1000);
    expect(total('apple')).toBe(2);
  });

  it('не трогает продукты не из рецепта', () => {
    useFridge.getState().addItems([
      { ingredientId: 'egg', quantity: 10, unit: 'шт' },
      { ingredientId: 'buckwheat', quantity: 500, unit: 'г' },
    ]);
    useFridge.getState().consumeRecipe(recipe('omlet'));

    expect(total('buckwheat')).toBe(500);
  });
});

describe('expiringSoon', () => {
  it('берёт ближайший скорый срок и пропускает далёкие, просроченные и бессрочные', () => {
    useFridge.getState().addItems([
      { ingredientId: 'sausage', quantity: 3, unit: 'шт' },
      { ingredientId: 'milk', quantity: 900, unit: 'мл' },
      { ingredientId: 'cheese', quantity: 200, unit: 'г' },
      { ingredientId: 'egg', quantity: 10, unit: 'шт' },
    ]);
    dateSome('sausage', 2, 1);
    dateSome('sausage', 1, 1); // ещё ближе — берётся именно этот
    dateSome('milk', 10, null); // далеко
    dateSome('cheese', -1, null); // просрочен: не поднимает рецепты
    // У яиц срока нет вовсе.

    expect([...expiringSoon(useFridge.getState().items).entries()]).toEqual([['sausage', 1]]);
  });
});

describe('migrateFridge', () => {
  it('переносит количество в партию и сбрасывает угаданный срок', () => {
    const migrated = migrateFridge(
      {
        assumePantry: false,
        items: [
          {
            id: 'x',
            ingredientId: 'milk',
            quantity: 900,
            unit: 'мл',
            addedAt: '2026-09-10T10:00:00.000Z',
            expiresAt: '2026-09-15T10:00:00.000Z',
          },
        ],
      },
      0,
    );

    expect(migrated.assumePantry).toBe(false);
    expect(migrated.items).toEqual([
      {
        id: 'x',
        ingredientId: 'milk',
        unit: 'мл',
        batches: [expect.objectContaining({ quantity: 900, expiresAt: null })],
      },
    ]);
  });

  it('не трогает данные новой версии', () => {
    const current = {
      assumePantry: true,
      items: [{ id: 'x', ingredientId: 'egg', unit: 'шт', batches: [{ id: 'b', quantity: 2, expiresAt: null }] }],
    };

    expect(migrateFridge(current, 1)).toEqual(current);
  });

  it('переживает пустое хранилище', () => {
    expect(migrateFridge(undefined, 0)).toEqual({ assumePantry: true, items: [] });
  });
});

describe('itemsUsedByRecipe', () => {
  it('перечисляет ровно то, что спишется — без базовых продуктов', () => {
    useFridge.getState().addItems([
      { ingredientId: 'egg', quantity: 4, unit: 'шт' },
      { ingredientId: 'flour', quantity: 500, unit: 'г' },
      { ingredientId: 'apple', quantity: 4, unit: 'шт' },
    ]);

    const used = itemsUsedByRecipe(recipe('sharlotka'), useFridge.getState().items).map(
      (candidate) => candidate.ingredientId,
    );

    expect(used).toEqual(expect.arrayContaining(['egg', 'apple']));
    expect(used).not.toContain('flour');
  });
});
