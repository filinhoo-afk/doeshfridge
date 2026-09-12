import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * Память приложения о том, что оно уже рассказало о себе. Отдельно от
 * холодильника и кулинарной книги: там данные человека, здесь — служебный факт.
 */

type OnboardingState = {
  /** Приветствие уже показывали. */
  seen: boolean;
  hydrated: boolean;
  markSeen: () => void;
};

export const useOnboarding = create<OnboardingState>()(
  persist(
    (set) => ({
      seen: false,
      hydrated: false,

      markSeen: () => set({ seen: true }),
    }),
    {
      name: 'doesh-onboarding',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ seen: state.seen }),
      onRehydrateStorage: () => () => {
        useOnboarding.setState({ hydrated: true });
      },
    },
  ),
);
