import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/** Тема приложения: как в системе или своя. */
export type ThemePreference = 'system' | 'light' | 'dark';

type PreferencesState = {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
};

/**
 * Appearance подменяет тему для всего приложения разом: и useColorScheme во
 * всех экранах, и системные окна Android — подтверждения, календарь сроков.
 * Системную тему телефона это не трогает.
 */
export function applyThemePreference(theme: ThemePreference) {
  Appearance.setColorScheme(theme === 'system' ? 'unspecified' : theme);
}

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: 'system',

      setTheme: (theme) => {
        applyThemePreference(theme);
        set({ theme });
      },
    }),
    {
      name: 'doesh-preferences',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ theme: state.theme }),
      // Сохранённую тему применяем сразу при загрузке, до первого экрана с данными.
      onRehydrateStorage: () => (state) => {
        applyThemePreference(state?.theme ?? 'system');
      },
    },
  ),
);
