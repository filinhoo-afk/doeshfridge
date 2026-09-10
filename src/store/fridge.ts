import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { isPantry, type Unit } from '@/data/ingredients';
import type { Recipe } from '@/data/recipes';
import { defaultExpiryDate } from '@/data/shelf-life';

export type FridgeItem = {
  id: string;
  ingredientId: string;
  quantity: number | null;
  unit: Unit | null;
  addedAt: string;
  expiresAt: string | null;
};

/** Позиция до попадания в холодильник: с экрана распознавания или из поиска. */
export type DraftItem = {
  ingredientId: string;
  quantity: number | null;
  unit: Unit | null;
};

type FridgeState = {
  items: FridgeItem[];
  assumePantry: boolean;
  hydrated: boolean;
  addItems: (drafts: DraftItem[]) => void;
  updateItem: (id: string, patch: Partial<Pick<FridgeItem, 'quantity' | 'unit' | 'expiresAt'>>) => void;
  removeItem: (id: string) => void;
  consumeRecipe: (recipe: Recipe) => void;
  clearAll: () => void;
  setAssumePantry: (value: boolean) => void;
};

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Что списывается при «Приготовил»: обязательные ингредиенты рецепта,
 * которые лежат в холодильнике.
 *
 * Базовые продукты не списываются никогда. Мука и соль расходуются щепотками,
 * рецепты их количество не указывают, и без этого исключения пачка муки
 * исчезала бы целиком после одной шарлотки.
 */
export function itemsUsedByRecipe(recipe: Recipe, items: FridgeItem[]): FridgeItem[] {
  const required = new Set(
    recipe.ingredients
      .filter((ingredient) => !ingredient.optional && !isPantry(ingredient.ingredientId))
      .map((ingredient) => ingredient.ingredientId),
  );
  return items.filter((item) => required.has(item.ingredientId));
}

export const useFridge = create<FridgeState>()(
  persist(
    (set) => ({
      items: [],
      assumePantry: true,
      hydrated: false,

      addItems: (drafts) =>
        set((state) => {
          const items = [...state.items];

          for (const draft of drafts) {
            const index = items.findIndex((item) => item.ingredientId === draft.ingredientId);

            if (index === -1) {
              items.push({
                id: createId(),
                ingredientId: draft.ingredientId,
                quantity: draft.quantity,
                unit: draft.unit,
                addedAt: new Date().toISOString(),
                expiresAt: defaultExpiryDate(draft.ingredientId),
              });
              continue;
            }

            // Продукт уже есть: докладываем количество и обновляем срок,
            // считая, что в холодильник поставили свежую упаковку.
            const existing = items[index];
            const sameUnit = existing.unit === draft.unit;
            const quantity =
              existing.quantity !== null && draft.quantity !== null && sameUnit
                ? existing.quantity + draft.quantity
                : existing.quantity ?? draft.quantity;

            items[index] = {
              ...existing,
              quantity,
              unit: existing.quantity === null ? draft.unit : existing.unit,
              expiresAt: defaultExpiryDate(draft.ingredientId),
            };
          }

          return { items };
        }),

      updateItem: (id, patch) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        })),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

      consumeRecipe: (recipe) =>
        set((state) => {
          const amountByIngredient = new Map(
            recipe.ingredients
              .filter((ingredient) => !ingredient.optional && !isPantry(ingredient.ingredientId))
              .map((ingredient) => [ingredient.ingredientId, ingredient]),
          );

          const items: FridgeItem[] = [];

          for (const item of state.items) {
            const used = amountByIngredient.get(item.ingredientId);
            if (!used) {
              items.push(item);
              continue;
            }

            // Вычесть можно только когда известны обе величины в одних единицах.
            // Иначе честнее убрать продукт целиком, чем показывать неверный остаток.
            if (item.quantity === null || used.amount === undefined || used.unit !== item.unit) {
              continue;
            }

            const left = item.quantity - used.amount;
            if (left > 0) {
              items.push({ ...item, quantity: left });
            }
          }

          return { items };
        }),

      clearAll: () => set({ items: [] }),

      setAssumePantry: (value) => set({ assumePantry: value }),
    }),
    {
      name: 'doesh-fridge',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ items: state.items, assumePantry: state.assumePantry }),
      onRehydrateStorage: () => () => {
        useFridge.setState({ hydrated: true });
      },
    },
  ),
);

/**
 * Множество id продуктов в холодильнике — вход для подбора рецептов.
 * Это обычная функция, а не селектор: новый Set на каждый рендер заставил бы
 * zustand считать состояние изменившимся. Оборачивайте в `useMemo` по `items`.
 */
export function availableIds(items: FridgeItem[]): Set<string> {
  return new Set(items.map((item) => item.ingredientId));
}
