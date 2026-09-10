import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { PrimaryButton } from '@/components/primary-button';
import { ProductRow } from '@/components/product-row';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CATEGORY_ORDER, getIngredient, type Category } from '@/data/ingredients';
import { daysUntil } from '@/data/shelf-life';
import { useTheme } from '@/hooks/use-theme';
import { formatProducts } from '@/lib/format';
import { useFridge, type FridgeItem } from '@/store/fridge';

type Section = { title: Category; data: FridgeItem[] };

/** Внутри категории — сначала то, что испортится раньше. */
function byExpiry(a: FridgeItem, b: FridgeItem): number {
  if (a.expiresAt && b.expiresAt) {
    return daysUntil(a.expiresAt) - daysUntil(b.expiresAt);
  }
  if (a.expiresAt) return -1;
  if (b.expiresAt) return 1;
  return 0;
}

function groupByCategory(items: FridgeItem[]): Section[] {
  const groups = new Map<Category, FridgeItem[]>();

  for (const item of items) {
    const category = getIngredient(item.ingredientId)?.category;
    if (!category) {
      continue;
    }
    const group = groups.get(category);
    if (group) {
      group.push(item);
    } else {
      groups.set(category, [item]);
    }
  }

  return CATEGORY_ORDER.filter((category) => groups.has(category)).map((category) => ({
    title: category,
    data: groups.get(category)!.sort(byExpiry),
  }));
}

export default function FridgeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const items = useFridge((state) => state.items);
  const hydrated = useFridge((state) => state.hydrated);
  const removeItem = useFridge((state) => state.removeItem);

  const sections = useMemo(() => groupByCategory(items), [items]);

  if (!hydrated) {
    return <View style={[styles.screen, { backgroundColor: theme.background }]} />;
  }

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          items.length > 0 ? (
            <ThemedText type="small" themeColor="textSecondary" style={styles.counter}>
              {formatProducts(items.length)}
            </ThemedText>
          ) : null
        }
        ListEmptyComponent={
          <EmptyState
            icon="mic-outline"
            title="Холодильник пуст"
            description="Нажмите «Продиктовать» и перечислите вслух, что у вас есть: «молоко, три яйца, помидоры и куриное филе»."
          />
        }
        renderSectionHeader={({ section }) => (
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionHeader}>
            {section.title.toUpperCase()}
          </ThemedText>
        )}
        renderItem={({ item }) => <ProductRow item={item} onRemove={removeItem} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <View
        style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        <PrimaryButton
          title="Продиктовать"
          icon="mic"
          onPress={() => router.push('/voice')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.four,
  },
  counter: {
    paddingVertical: Spacing.two,
  },
  sectionHeader: {
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
    letterSpacing: 0.6,
  },
  separator: {
    height: Spacing.two,
  },
  footer: {
    padding: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
