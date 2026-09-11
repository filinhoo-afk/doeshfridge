import { FlatList, Linking, Pressable, StyleSheet, View } from 'react-native';

import { RecipeThumb } from '@/components/recipe-photo';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { RECIPE_PHOTOS, type PhotoCredit } from '@/data/recipe-photos';
import { getRecipe } from '@/data/recipes';
import { useTheme } from '@/hooks/use-theme';

type CreditRow = { recipeId: string; title: string; credit: PhotoCredit };

const ROWS: CreditRow[] = Object.entries(RECIPE_PHOTOS)
  .flatMap(([recipeId, photo]) => {
    const recipe = getRecipe(recipeId);
    return recipe && photo.credit ? [{ recipeId, title: recipe.title, credit: photo.credit }] : [];
  })
  .sort((a, b) => a.title.localeCompare(b.title, 'ru'));

export default function PhotoCreditsScreen() {
  const theme = useTheme();

  return (
    <FlatList
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.content}
      data={ROWS}
      keyExtractor={(row) => row.recipeId}
      ListHeaderComponent={
        <ThemedText type="small" themeColor="textSecondary" style={styles.intro}>
          Фотографии блюд взяты с Wikimedia Commons и используются по свободным лицензиям Creative
          Commons или как общественное достояние. Снимки уменьшены и обрезаны до формата 4:3.
          Нажмите на строку, чтобы открыть страницу файла с полным текстом лицензии.
        </ThemedText>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <Pressable
          accessibilityRole="link"
          onPress={() => void Linking.openURL(item.credit.page)}
          style={({ pressed }) => [
            styles.row,
            { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.7 : 1 },
          ]}>
          <RecipeThumb recipeId={item.recipeId} size={48} />
          <View style={styles.text}>
            <ThemedText style={styles.title}>{item.title}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {item.credit.author} · {item.credit.license}
            </ThemedText>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.three,
  },
  intro: {
    paddingBottom: Spacing.three,
  },
  separator: {
    height: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Spacing.three,
    padding: Spacing.two,
  },
  text: {
    flex: 1,
    gap: Spacing.half,
  },
  title: {
    fontWeight: '600',
  },
});
