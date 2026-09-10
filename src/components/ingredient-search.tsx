import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { searchIngredients } from '@/lib/ingredient-index';

import { ThemedText } from './themed-text';

type IngredientSearchProps = {
  onPick: (ingredientId: string) => void;
  /** Уже добавленные продукты — не предлагаем их повторно. */
  exclude: ReadonlySet<string>;
  placeholder?: string;
};

const MAX_RESULTS = 8;

/** Ручное добавление: и когда распознавание промахнулось, и когда что-то забыли. */
export function IngredientSearch({
  onPick,
  exclude,
  placeholder = 'Добавить продукт вручную',
}: IngredientSearchProps) {
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const results = useMemo(
    () =>
      searchIngredients(query)
        .filter((ingredient) => !exclude.has(ingredient.id))
        .slice(0, MAX_RESULTS),
    [query, exclude],
  );

  const pick = (ingredientId: string) => {
    onPick(ingredientId);
    setQuery('');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.field, { backgroundColor: theme.backgroundElement }]}>
        <Ionicons name="search" size={18} color={theme.textSecondary} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
          autoCorrect={false}
          style={[styles.input, { color: theme.text }]}
        />
        {query.length > 0 ? (
          <Pressable accessibilityRole="button" hitSlop={Spacing.two} onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color={theme.textSecondary} />
          </Pressable>
        ) : null}
      </View>

      {query.length > 0 && results.length === 0 ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.nothing}>
          Ничего не нашлось. Попробуйте другое слово — например, «картошка» вместо «картофан».
        </ThemedText>
      ) : null}

      {results.map((ingredient) => (
        <Pressable
          key={ingredient.id}
          accessibilityRole="button"
          onPress={() => pick(ingredient.id)}
          style={({ pressed }) => [styles.result, { opacity: pressed ? 0.6 : 1 }]}>
          <Ionicons name="add-circle-outline" size={18} color={theme.accent} />
          <ThemedText style={styles.resultName}>{ingredient.name}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {ingredient.category}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.three,
    fontSize: 16,
  },
  nothing: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  resultName: {
    flex: 1,
  },
});
