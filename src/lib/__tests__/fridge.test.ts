import { getRecipe, type Recipe } from '@/data/recipes';
import { itemsUsedByRecipe, useFridge, type FridgeItem } from '@/store/fridge';

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

function quantityOf(ingredientId: string): number | null | undefined {
  return useFridge
    .getState()
    .items.find((item: FridgeItem) => item.ingredientId === ingredientId)?.quantity;
}

function has(ingredientId: string): boolean {
  return useFridge.getState().items.some((item) => item.ingredientId === ingredientId);
}

beforeEach(() => {
  useFridge.setState({ items: [], assumePantry: true });
});

describe('addItems', () => {
  it('складывает количество, когда продукт уже лежит в холодильнике', () => {
    useFridge.getState().addItems([{ ingredientId: 'egg', quantity: 3, unit: 'шт' }]);
    useFridge.getState().addItems([{ ingredientId: 'egg', quantity: 2, unit: 'шт' }]);

    expect(useFridge.getState().items).toHaveLength(1);
    expect(quantityOf('egg')).toBe(5);
  });

  it('не плодит дубликаты при добавлении без количества', () => {
    useFridge.getState().addItems([{ ingredientId: 'milk', quantity: null, unit: null }]);
    useFridge.getState().addItems([{ ingredientId: 'milk', quantity: 500, unit: 'мл' }]);

    expect(useFridge.getState().items).toHaveLength(1);
    expect(quantityOf('milk')).toBe(500);
  });

  it('проставляет срок годности скоропортящимся и не проставляет базовым', () => {
    useFridge.getState().addItems([
      { ingredientId: 'milk', quantity: null, unit: null },
      { ingredientId: 'salt', quantity: null, unit: null },
    ]);

    const items = useFridge.getState().items;
    expect(items.find((item) => item.ingredientId === 'milk')?.expiresAt).not.toBeNull();
    expect(items.find((item) => item.ingredientId === 'salt')?.expiresAt).toBeNull();
  });
});

describe('consumeRecipe', () => {
  it('вычитает израсходованное количество и оставляет остаток', () => {
    // Омлету нужно 4 яйца.
    useFridge.getState().addItems([{ ingredientId: 'egg', quantity: 10, unit: 'шт' }]);
    useFridge.getState().consumeRecipe(recipe('omlet'));

    expect(quantityOf('egg')).toBe(6);
  });

  it('убирает продукт, когда он израсходован полностью', () => {
    useFridge.getState().addItems([{ ingredientId: 'egg', quantity: 4, unit: 'шт' }]);
    useFridge.getState().consumeRecipe(recipe('omlet'));

    expect(has('egg')).toBe(false);
  });

  it('не трогает базовые продукты — их расход рецептами не указан', () => {
    // У шарлотки мука и сода идут без количества: без исключения для базовых
    // продуктов целая пачка муки исчезла бы после одного пирога.
    useFridge.getState().addItems([
      { ingredientId: 'flour', quantity: 1000, unit: 'г' },
      { ingredientId: 'apple', quantity: 6, unit: 'шт' },
    ]);
    useFridge.getState().consumeRecipe(recipe('sharlotka'));

    expect(quantityOf('flour')).toBe(1000);
    expect(quantityOf('apple')).toBe(2);
  });

  it('не трогает продукты не из рецепта', () => {
    useFridge.getState().addItems([
      { ingredientId: 'egg', quantity: 10, unit: 'шт' },
      { ingredientId: 'buckwheat', quantity: 500, unit: 'г' },
    ]);
    useFridge.getState().consumeRecipe(recipe('omlet'));

    expect(quantityOf('buckwheat')).toBe(500);
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
      (item) => item.ingredientId,
    );

    expect(used).toEqual(expect.arrayContaining(['egg', 'apple']));
    expect(used).not.toContain('flour');
  });
});
