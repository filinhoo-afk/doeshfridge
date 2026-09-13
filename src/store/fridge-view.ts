import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Category } from '@/data/ingredients';

/**
 * Как показан холодильник: какие категории свёрнуты. Отдельно от продуктов —
 * это вид, а не данные: сбросить его можно, ничего не потеряв.
 */

type FridgeViewState = {
  collapsed: Category[];
  hydrated: boolean;
  toggleCategory: (category: Category) => void;
};

export const useFridgeView = create<FridgeViewState>()(
  persist(
    (set) => ({
      collapsed: [],
      hydrated: false,

      toggleCategory: (category) =>
        set((state) => ({
          collapsed: state.collapsed.includes(category)
            ? state.collapsed.filter((value) => value !== category)
            : [...state.collapsed, category],
        })),
    }),
    {
      name: 'doesh-fridge-view',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ collapsed: state.collapsed }),
      onRehydrateStorage: () => () => {
        useFridgeView.setState({ hydrated: true });
      },
    },
  ),
);
