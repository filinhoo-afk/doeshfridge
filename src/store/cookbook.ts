import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * Личная кулинарная книга: избранные рецепты и история готовок.
 * Отдельно от холодильника: это про вкусы, а не про продукты.
 */

export type CookRecord = {
  count: number;
  /** Когда готовили последний раз — при равном числе готовок недавнее выше. */
  lastAt: string;
};

type CookbookState = {
  /** id рецептов, последние добавленные — первыми. */
  favorites: string[];
  cooked: Record<string, CookRecord>;
  hydrated: boolean;
  toggleFavorite: (recipeId: string) => void;
  recordCooked: (recipeId: string) => void;
};

/** С какого числа готовок рецепт попадает в «Часто готовлю». */
export const FREQUENT_MIN = 2;

export const useCookbook = create<CookbookState>()(
  persist(
    (set) => ({
      favorites: [],
      cooked: {},
      hydrated: false,

      toggleFavorite: (recipeId) =>
        set((state) => ({
          favorites: state.favorites.includes(recipeId)
            ? state.favorites.filter((id) => id !== recipeId)
            : [recipeId, ...state.favorites],
        })),

      recordCooked: (recipeId) =>
        set((state) => ({
          cooked: {
            ...state.cooked,
            [recipeId]: {
              count: (state.cooked[recipeId]?.count ?? 0) + 1,
              lastAt: new Date().toISOString(),
            },
          },
        })),
    }),
    {
      name: 'doesh-cookbook',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favorites: state.favorites, cooked: state.cooked }),
      onRehydrateStorage: () => () => {
        useCookbook.setState({ hydrated: true });
      },
    },
  ),
);

/**
 * «Часто готовлю»: рецепты от `min` готовок, самые частые первыми, при равном
 * числе — недавние. Одна готовка ещё не привычка: иначе раздел повторял бы
 * просто последние рецепты.
 */
export function frequentlyCooked(
  cooked: Record<string, CookRecord>,
  min: number = FREQUENT_MIN,
): ({ recipeId: string } & CookRecord)[] {
  return Object.entries(cooked)
    .filter(([, record]) => record.count >= min)
    .sort(([, a], [, b]) => b.count - a.count || b.lastAt.localeCompare(a.lastAt))
    .map(([recipeId, record]) => ({ recipeId, ...record }));
}
