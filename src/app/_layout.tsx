import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useExpiryReminders } from '@/hooks/use-expiry-reminders';
import { usePhotoCache } from '@/hooks/use-photo-cache';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useExpiryReminders();
  usePhotoCache();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
