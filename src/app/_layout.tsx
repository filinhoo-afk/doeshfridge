import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useExpiryReminders } from '@/hooks/use-expiry-reminders';
import { usePhotoCache } from '@/hooks/use-photo-cache';
import { useTheme } from '@/hooks/use-theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  useExpiryReminders();
  usePhotoCache();

  // Шапки и фон экранов навигации — из нашей палитры, иначе у стековых экранов
  // остаётся стандартный холодный серый React Navigation.
  const navigationTheme = useMemo(() => {
    const base = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: theme.accent,
        background: theme.background,
        card: theme.background,
        text: theme.text,
        border: theme.border,
      },
    };
  }, [colorScheme, theme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={navigationTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="voice"
            options={{ presentation: 'modal', title: 'Что в холодильнике?' }}
          />
          <Stack.Screen name="recipe/[id]" options={{ title: 'Рецепт' }} />
          <Stack.Screen name="product/[id]" options={{ title: 'Продукт' }} />
          <Stack.Screen name="photo-credits" options={{ title: 'Авторы фото' }} />
          <Stack.Screen name="welcome" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
