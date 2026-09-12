import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useEffect } from 'react';

import { PHOTOS_VERSION } from '@/data/recipe-photos';

const KEY = 'doesh-photos-version';

/**
 * Сброс кэша картинок при смене набора фотографий.
 *
 * expo-image кэширует снимок по номеру ресурса Android, а не по содержимому.
 * Стоит добавить или заменить хоть одну картинку — номера съезжают, и после
 * обновления к рецепту прилипает чужое блюдо: борщ показывает фасолевый суп.
 * Переустановка не помогает, кэш живёт в данных приложения.
 */
export function usePhotoCache() {
  useEffect(() => {
    let alive = true;

    void (async () => {
      const saved = await AsyncStorage.getItem(KEY);
      if (!alive || saved === PHOTOS_VERSION) {
        return;
      }
      await Promise.all([Image.clearDiskCache(), Image.clearMemoryCache()]);
      await AsyncStorage.setItem(KEY, PHOTOS_VERSION);
    })();

    return () => {
      alive = false;
    };
  }, []);
}
