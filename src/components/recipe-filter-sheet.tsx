import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { RECIPES } from '@/data/recipes';
import { useTheme } from '@/hooks/use-theme';
import { plural } from '@/lib/format';
import {
  countSelectedFilters,
  FILTER_GROUPS,
  filterRecipes,
  TIME_LIMITS,
  type RecipeFilters,
} from '@/lib/recipe-filter';

import { PrimaryButton } from './primary-button';
import { ThemedText } from './themed-text';

type RecipeFilterSheetProps = {
  /** Фильтры, с которыми окно открыли. */
  initialFilters: RecipeFilters;
  /** Окно закрыли — любым способом; в аргументе итоговый выбор. */
  onClose: (filters: RecipeFilters) => void;
};

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: active ? theme.accent : theme.backgroundSelected,
          opacity: pressed ? 0.7 : 1,
        },
      ]}>
      <ThemedText type="small" style={{ color: active ? theme.onAccent : theme.text }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {title.toUpperCase()}
      </ThemedText>
      <View style={styles.chips}>{children}</View>
    </View>
  );
}

/**
 * Окно со всеми фильтрами. Выбор копится внутри окна и уходит на экран только
 * при закрытии: если применять каждое нажатие, за шторкой пересобирается весь
 * список с фотографиями, и чипс загорается с заметной задержкой. Число на кнопке
 * считается отдельно — это только фильтр по 500 рецептам, без подбора и отрисовки.
 */
export function RecipeFilterSheet({ initialFilters, onClose }: RecipeFilterSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [filters, setFilters] = useState(initialFilters);
  const resultCount = useMemo(() => filterRecipes(RECIPES, filters).length, [filters]);

  // Закрыли касанием мимо окна или кнопкой «Назад» — выбор тоже применяется:
  // отмеченное не должно пропадать молча.
  const close = () => onClose(filters);

  const toggleTag = (tag: string) =>
    setFilters({
      ...filters,
      tags: filters.tags.includes(tag)
        ? filters.tags.filter((value) => value !== tag)
        : [...filters.tags, tag],
    });

  const toggleTime = (minutes: number) =>
    setFilters({ ...filters, maxMinutes: filters.maxMinutes === minutes ? null : minutes });

  // Сбрасываем только то, что выбирается в окне: набранный поиск остаётся.
  const reset = () => setFilters({ ...filters, tags: [], maxMinutes: null });
  const nothingSelected = countSelectedFilters(filters) === 0;

  const showTitle =
    resultCount === 0
      ? 'Ничего не подходит'
      : `Показать ${resultCount} ${plural(resultCount, 'рецепт', 'рецепта', 'рецептов')}`;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={close} statusBarTranslucent>
      <View style={styles.overlay}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Закрыть"
          style={StyleSheet.absoluteFill}
          onPress={close}
        />
        <View
          style={[
            styles.sheet,
            { backgroundColor: theme.backgroundElement, paddingBottom: insets.bottom + Spacing.three },
          ]}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>Фильтры</ThemedText>
            <Pressable
              accessibilityRole="button"
              disabled={nothingSelected}
              hitSlop={Spacing.two}
              onPress={reset}>
              <ThemedText
                type="smallBold"
                themeColor={nothingSelected ? 'textSecondary' : 'accent'}
                style={nothingSelected ? styles.disabled : undefined}>
                Сбросить
              </ThemedText>
            </Pressable>
          </View>

          <ScrollView style={styles.scroll} contentContainerStyle={styles.sections}>
            <Section title="Время приготовления">
              {TIME_LIMITS.map((minutes) => (
                <Chip
                  key={minutes}
                  label={`до ${minutes} мин`}
                  active={filters.maxMinutes === minutes}
                  onPress={() => toggleTime(minutes)}
                />
              ))}
            </Section>

            {FILTER_GROUPS.map((group) => (
              <Section key={group.title} title={group.title}>
                {group.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    active={filters.tags.includes(tag)}
                    onPress={() => toggleTag(tag)}
                  />
                ))}
              </Section>
            ))}
          </ScrollView>

          <PrimaryButton title={showTitle} disabled={resultCount === 0} onPress={close} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    gap: Spacing.three,
    maxHeight: '85%',
    borderTopLeftRadius: Spacing.four,
    borderTopRightRadius: Spacing.four,
    padding: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
  scroll: {
    flexGrow: 0,
  },
  sections: {
    gap: Spacing.four,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    letterSpacing: 0.6,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    borderRadius: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + Spacing.half,
  },
});
