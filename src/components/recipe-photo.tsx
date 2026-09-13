import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { RECIPE_PHOTOS } from '@/data/recipe-photos';
import { useTheme } from '@/hooks/use-theme';

import { ThemedText } from './themed-text';

/**
 * Фото на всю ширину карточки рецепта. Кадр 2:1 из снимка 4:3 — блюдо стоит в
 * центре, так что обрезаются только края стола. Без фото ничего не рисует.
 */
export function RecipeCover({ recipeId }: { recipeId: string }) {
  const photo = RECIPE_PHOTOS[recipeId];
  if (!photo) {
    return null;
  }

  return (
    <Image
      source={photo.source}
      style={styles.cover}
      contentFit="cover"
      transition={150}
      accessibilityIgnoresInvertColors
    />
  );
}

/** Квадратное превью для списков; без фото — нейтральная заглушка. */
export function RecipeThumb({ recipeId, size = 64 }: { recipeId: string; size?: number }) {
  const theme = useTheme();
  const photo = RECIPE_PHOTOS[recipeId];
  const box = { width: size, height: size, borderRadius: Spacing.two };

  if (!photo) {
    return (
      <View style={[styles.placeholder, box, { backgroundColor: theme.backgroundSelected }]}>
        <Ionicons name="restaurant-outline" size={size * 0.4} color={theme.textSecondary} />
      </View>
    );
  }

  return <Image source={photo.source} style={box} contentFit="cover" transition={150} />;
}

/**
 * Большое фото на экране рецепта, от края до края экрана. У стороннего снимка —
 * подпись автора: этого требуют лицензии CC BY.
 */
export function RecipeHero({ recipeId }: { recipeId: string }) {
  const photo = RECIPE_PHOTOS[recipeId];
  if (!photo) {
    return null;
  }
  const { credit } = photo;

  return (
    <View style={styles.hero}>
      <Image
        source={photo.source}
        style={styles.heroImage}
        contentFit="cover"
        transition={200}
        accessibilityIgnoresInvertColors
      />
      {credit ? (
        <Pressable
          accessibilityRole="link"
          accessibilityHint="Открывает страницу фото на Wikimedia Commons"
          onPress={() => void Linking.openURL(credit.page)}
          style={styles.credit}>
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
            Фото: {credit.author} · {credit.license}
          </ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    width: '100%',
    aspectRatio: 2,
  },
  hero: {
    gap: Spacing.one,
  },
  heroImage: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  credit: {
    paddingHorizontal: Spacing.three,
  },
});
