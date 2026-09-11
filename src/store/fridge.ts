import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { isPantry, type Unit } from '@/data/ingredients';
import type { Recipe } from '@/data/recipes';
import { daysUntil, expiryStatus } from '@/data/shelf-life';
import {
  addBatch,
  consume,
  removeBatch,
  setExpiry,
  setQuantity,
  type Batch,
} from '@/lib/batches';

export type FridgeItem = {
  id: string;
  ingredientId: string;
  /** Одна единица на все партии: складывать граммы со штуками нельзя. */
  unit: Unit | null;
  /** Не бывает пустым: вместе с последней партией уходит и продукт. */
  batches: Batch[];
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
  /** Срок на `count` единиц партии; меньше всей партии — отделяет их в новую. */
  setBatchExpiry: (
    itemId: string,
    batchId: string,
    expiresAt: string | null,
    count: number | null,
  ) => void;
  setBatchQuantity: (itemId: string, batchId: string, quantity: number | null) => void;
  addItemBatch: (itemId: string, quantity: number, expiresAt: string | null) => void;
  removeItemBatch: (itemId: string, batchId: string) => void;
  removeItem: (id: string) => void;
  consumeRecipe: (recipe: Recipe) => void;
  clearAll: () => void;
  setAssumePantry: (value: boolean) => void;
};

type PersistedFridge = Pick<FridgeState, 'items' | 'assumePantry'>;

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Меняет партии одного продукта; продукт без партий удаляется. */
function updateBatches(
  items: FridgeItem[],
  itemId: string,
  update: (batches: Batch[]) => Batch[],
): FridgeItem[] {
  return items.flatMap((item) => {
    if (item.id !== itemId) {
      return [item];
    }
    const batches = update(item.batches);
    return batches.length > 0 ? [{ ...item, batches }] : [];
  });
}

/**
 * Докладывает купленное к продукту. Новое приходит без срока — пользователь
 * укажет его сам, если захочет, — поэтому прибавляется к бессрочной партии.
 * Количество в других единицах сложить нельзя: тогда продукт не меняется.
 */
function absorbDraft(item: FridgeItem, draft: DraftItem): FridgeItem {
  const unit = item.unit ?? draft.unit;
  if (draft.quantity === null) {
    return { ...item, unit };
  }
  if (item.unit !== null && draft.unit !== null && item.unit !== draft.unit) {
    return item;
  }
  return {
    ...item,
    unit,
    batches: addBatch(item.batches, { id: createId(), quantity: draft.quantity, expiresAt: null }),
  };
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

type LegacyItem = {
  id: string;
  ingredientId: string;
  quantity: number | null;
  unit: Unit | null;
};

/**
 * Версия 0 хранила у продукта одно количество и один срок, угаданный по
 * категории. Срок отбрасывается: пользователь его не вводил, а новое правило —
 * «без срока, пока не указан». Количество переезжает в единственную партию.
 */
export function migrateFridge(persisted: unknown, version: number): PersistedFridge {
  const state = (persisted ?? {}) as Partial<PersistedFridge> & { items?: unknown[] };
  if (version >= 1) {
    return { items: (state.items ?? []) as FridgeItem[], assumePantry: state.assumePantry ?? true };
  }
  return {
    assumePantry: state.assumePantry ?? true,
    items: ((state.items ?? []) as LegacyItem[]).map((item) => ({
      id: item.id,
      ingredientId: item.ingredientId,
      unit: item.unit,
      batches: [{ id: createId(), quantity: item.quantity, expiresAt: null }],
    })),
  };
}

export const useFridge = create<FridgeState>()(
  persist(
    (set) => ({
      items: [],
      assumePantry: true,
      hydrated: false,

      addItems: (drafts) =>
        set((state) => {
          let items = [...state.items];

          for (const draft of drafts) {
            const existing = items.find((item) => item.ingredientId === draft.ingredientId);
            if (existing) {
              items = items.map((item) => (item.id === existing.id ? absorbDraft(item, draft) : item));
            } else {
              items.push({
                id: createId(),
                ingredientId: draft.ingredientId,
                unit: draft.unit,
                batches: [{ id: createId(), quantity: draft.quantity, expiresAt: null }],
              });
            }
          }

          return { items };
        }),

      setBatchExpiry: (itemId, batchId, expiresAt, count) =>
        set((state) => ({
          items: updateBatches(state.items, itemId, (batches) =>
            setExpiry(batches, batchId, expiresAt, count, createId),
          ),
        })),

      setBatchQuantity: (itemId, batchId, quantity) =>
        set((state) => ({
          items: updateBatches(state.items, itemId, (batches) =>
            setQuantity(batches, batchId, quantity),
          ),
        })),

      addItemBatch: (itemId, quantity, expiresAt) =>
        set((state) => ({
          items: updateBatches(state.items, itemId, (batches) =>
            addBatch(batches, { id: createId(), quantity, expiresAt }),
          ),
        })),

      removeItemBatch: (itemId, batchId) =>
        set((state) => ({
          items: updateBatches(state.items, itemId, (batches) => removeBatch(batches, batchId)),
        })),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

      consumeRecipe: (recipe) =>
        set((state) => {
          const used = new Map(
            recipe.ingredients
              .filter((ingredient) => !ingredient.optional && !isPantry(ingredient.ingredientId))
              .map((ingredient) => [ingredient.ingredientId, ingredient]),
          );

          return {
            items: state.items.flatMap((item) => {
              const ingredient = used.get(item.ingredientId);
              if (!ingredient) {
                return [item];
              }
              // Вычесть можно, только когда рецепт меряет в тех же единицах.
              const amount =
                ingredient.amount !== undefined && ingredient.unit === item.unit
                  ? ingredient.amount
                  : null;
              const batches = consume(item.batches, amount);
              return batches.length > 0 ? [{ ...item, batches }] : [];
            }),
          };
        }),

      clearAll: () => set({ items: [] }),

      setAssumePantry: (value) => set({ assumePantry: value }),
    }),
    {
      name: 'doesh-fridge',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ items: state.items, assumePantry: state.assumePantry }),
      migrate: migrateFridge,
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

/**
 * Что скоро испортится: id продукта → дней до ближайшего срока. Порог тот же,
 * что у жёлтой метки в холодильнике: что там подсвечено, то и поднимает рецепты.
 *
 * Просроченное сюда не попадает: приложение не должно подталкивать готовить
 * из испорченного. Как и `availableIds`, оборачивайте в `useMemo` по `items`.
 */
export function expiringSoon(items: FridgeItem[], now: Date = new Date()): Map<string, number> {
  const result = new Map<string, number>();

  for (const item of items) {
    for (const batch of item.batches) {
      if (!batch.expiresAt || expiryStatus(batch.expiresAt, now) !== 'soon') {
        continue;
      }
      const days = daysUntil(batch.expiresAt, now);
      const nearest = result.get(item.ingredientId);
      if (nearest === undefined || days < nearest) {
        result.set(item.ingredientId, days);
      }
    }
  }

  return result;
}
