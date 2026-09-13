import Ionicons from '@expo/vector-icons/Ionicons';
import { startTransition, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { countSelectedFilters, type RecipeFilters } from '@/lib/recipe-filter';

import { RecipeFilterSheet } from './recipe-filter-sheet';
import { ThemedText } from './themed-text';

type RecipeFilterBarProps = {
  filters: RecipeFilters;
  onChange: (filters: RecipeFilters) => void;
};

/** Поиск по базе и кнопка, открывающая окно со всеми фильтрами. */
export function RecipeFilterBar({ filters, onChange }: RecipeFilterBarProps) {
  const theme = useTheme();
  const [sheetOpen, setSheetOpen] = useState(false);

  const selected = countSelectedFilters(filters);
  // Кнопок с фильтрами на экране больше нет — выбранное перечисляем строкой,
  // иначе непонятно, почему выдача вдруг стала короче.
  const summary = [
    filters.maxMinutes === null ? null : `до ${filters.maxMinutes} мин`,
    ...filters.tags,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.field, { backgroundColor: theme.backgroundElement }]}>
          <Ionicons name="search" size={18} color={theme.textSecondary} />
          <TextInput
            value={filters.query}
            onChangeText={(query) => onChange({ ...filters, query })}
            placeholder="Блюдо или продукт"
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

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={selected > 0 ? `Фильтры, выбрано ${selected}` : 'Фильтры'}
          onPress={() => setSheetOpen(true)}
          style={({ pressed }) => [
            styles.filterButton,
            {
              backgroundColor: selected > 0 ? theme.accent : theme.backgroundElement,
              opacity: pressed ? 0.7 : 1,
            },
          ]}>
          <Ionicons
            name="options-outline"
            size={22}
            color={selected > 0 ? theme.onAccent : theme.text}
          />
          {selected > 0 ? (
            <View
              style={[styles.badge, { backgroundColor: theme.background, borderColor: theme.accent }]}>
              <ThemedText type="smallBold" style={[styles.badgeText, { color: theme.accent }]}>
                {selected}
              </ThemedText>
            </View>
          ) : null}
        </Pressable>
      </View>

      {summary ? (
        <Pressable accessibilityRole="button" onPress={() => setSheetOpen(true)}>
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
            Фильтры: {summary}
          </ThemedText>
        </Pressable>
      ) : null}

      {sheetOpen ? (
        <RecipeFilterSheet
          initialFilters={filters}
          onClose={(next) => {
            setSheetOpen(false);
            const changed =
              next.maxMinutes !== filters.maxMinutes ||
              next.tags.length !== filters.tags.length ||
              next.tags.some((tag) => !filters.tags.includes(tag));
            // Пересборка списка — в переходе: шторка закрывается сразу, не дожидаясь её.
            if (changed) {
              startTransition(() => onChange(next));
            }
          }}
        />
      ) : null}
    </View>
  );
}

const FILTER_BUTTON_SIZE = 52;

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
    paddingTop: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  field: {
    flex: 1,
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
  filterButton: {
    width: FILTER_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.three,
  },
  badge: {
    position: 'absolute',
    top: -Spacing.one,
    right: -Spacing.one,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.one,
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 16,
  },
});
