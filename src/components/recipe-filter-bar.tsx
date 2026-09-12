import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { FILTER_TAGS, TIME_LIMITS, type RecipeFilters } from '@/lib/recipe-filter';

import { ThemedText } from './themed-text';

type RecipeFilterBarProps = {
  filters: RecipeFilters;
  onChange: (filters: RecipeFilters) => void;
};

type ChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function Chip({ label, selected, onPress }: ChipProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected ? theme.accent : theme.backgroundElement,
          opacity: pressed ? 0.7 : 1,
        },
      ]}>
      <ThemedText type="small" style={selected ? { color: theme.onAccent } : undefined}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

/** Поиск по базе и быстрые фильтры: время приготовления и вид блюда. */
export function RecipeFilterBar({ filters, onChange }: RecipeFilterBarProps) {
  const theme = useTheme();

  const toggleTag = (tag: string) =>
    onChange({
      ...filters,
      tags: filters.tags.includes(tag)
        ? filters.tags.filter((value) => value !== tag)
        : [...filters.tags, tag],
    });

  const toggleTime = (minutes: number) =>
    onChange({ ...filters, maxMinutes: filters.maxMinutes === minutes ? null : minutes });

  return (
    <View style={styles.container}>
      <View style={[styles.field, { backgroundColor: theme.backgroundElement }]}>
        <Ionicons name="search" size={18} color={theme.textSecondary} />
        <TextInput
          value={filters.query}
          onChangeText={(query) => onChange({ ...filters, query })}
          placeholder="Поиск по названию и продуктам"
          placeholderTextColor={theme.textSecondary}
          autoCorrect={false}
          returnKeyType="search"
          style={[styles.input, { color: theme.text }]}
        />
        {filters.query.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Очистить поиск"
            hitSlop={Spacing.two}
            onPress={() => onChange({ ...filters, query: '' })}>
            <Ionicons name="close-circle" size={18} color={theme.textSecondary} />
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.chips}>
        {TIME_LIMITS.map((minutes) => (
          <Chip
            key={minutes}
            label={`до ${minutes} мин`}
            selected={filters.maxMinutes === minutes}
            onPress={() => toggleTime(minutes)}
          />
        ))}
        {FILTER_TAGS.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            selected={filters.tags.includes(tag)}
            onPress={() => toggleTag(tag)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
    paddingTop: Spacing.three,
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
  chips: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingRight: Spacing.three,
  },
  chip: {
    borderRadius: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
});
