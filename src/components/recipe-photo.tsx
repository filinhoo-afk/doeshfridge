import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { RECIPE_PHOTOS } from '@/data/recipe-photos';
import { useTheme } from '@/hooks/use-theme';

import { ThemedText } from './themed-text';

/** Квадратное превью для карточки; без фото — нейтральная заглушка. */
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

/** Большое фото на экране рецепта с подписью автора — этого требуют лицензии CC BY. */
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
          onPress={() => void Linking.openURL(credit.page)}>
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
  hero: {
    gap: Spacing.one,
  },
  heroImage: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: Spacing.three,
  },
});
