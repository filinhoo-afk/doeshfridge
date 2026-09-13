import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, SectionList, StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { ExpiryBanner } from '@/components/expiry-banner';
import { PrimaryButton } from '@/components/primary-button';
import { ProductRow } from '@/components/product-row';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CATEGORY_ORDER, getIngredient, ingredientName, type Category } from '@/data/ingredients';
import { useTheme } from '@/hooks/use-theme';
import { useWelcome } from '@/hooks/use-welcome';
import { nearestDated } from '@/lib/batches';
import { formatProducts } from '@/lib/format';
import { expiryCounts, expiryDigest, useFridge, type FridgeItem } from '@/store/fridge';
import { useFridgeView } from '@/store/fridge-view';

type CategoryGroup = { title: Category; data: FridgeItem[] };

type Section = CategoryGroup & {
  /** Продуктов в категории — и тогда, когда она свёрнута и `data` пустой. */
  count: number;
  collapsed: boolean;
  expired: number;
  soon: number;
};

/** Сколько названий показывать в подтверждении, остальные — «и ещё N». */
const NAMES_IN_ALERT = 5;

/** Внутри категории — сначала то, что испортится раньше, бессрочное в конце. */
function byExpiry(a: FridgeItem, b: FridgeItem): number {
  const first = nearestDated(a.batches)?.expiresAt ?? null;
  const second = nearestDated(b.batches)?.expiresAt ?? null;
  if (first && second) {
    return first.localeCompare(second);
  }
  if (first) {
    return -1;
  }
  return second ? 1 : 0;
}

function groupByCategory(items: FridgeItem[]): CategoryGroup[] {
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

/** «молоко, яйца, сыр и ещё 2» — чтобы подтверждение не растягивалось на весь экран. */
function shortList(names: string[]): string {
  const unique = [...new Set(names)];
  const shown = unique.slice(0, NAMES_IN_ALERT).join(', ');
  const rest = unique.length - NAMES_IN_ALERT;
  return rest > 0 ? `${shown} и ещё ${rest}` : shown;
}

export default function FridgeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const items = useFridge((state) => state.items);
  const hydrated = useFridge((state) => state.hydrated);
  const removeItems = useFridge((state) => state.removeItems);
  const removeExpired = useFridge((state) => state.removeExpired);
  const collapsed = useFridgeView((state) => state.collapsed);
  const viewHydrated = useFridgeView((state) => state.hydrated);
  const toggleCategory = useFridgeView((state) => state.toggleCategory);

  useWelcome();

  // null — обычный режим, множество — режим выбора с отмеченными продуктами.
  const [selected, setSelected] = useState<Set<string> | null>(null);
  const selecting = selected !== null;

  const groups = useMemo(() => groupByCategory(items), [items]);
  const sections = useMemo<Section[]>(
    () =>
      groups.map((group) => {
        // В режиме выбора всё развёрнуто: «Выбрать все» не должно отмечать то, чего не видно.
        const isCollapsed = !selecting && collapsed.includes(group.title);
        return {
          ...group,
          ...expiryCounts(group.data),
          count: group.data.length,
          collapsed: isCollapsed,
          data: isCollapsed ? [] : group.data,
        };
      }),
    [groups, collapsed, selecting],
  );
  const digest = useMemo(() => expiryDigest(items), [items]);

  // Ждём и вид: иначе свёрнутые категории на мгновение показались бы развёрнутыми.
  if (!hydrated || !viewHydrated) {
    return <View style={[styles.screen, { backgroundColor: theme.background }]} />;
  }

  const allSelected = selected !== null && items.length > 0 && selected.size === items.length;

  const toggle = (id: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const confirmDelete = () => {
    if (!selected || selected.size === 0) {
      return;
    }
    const names = items
      .filter((item) => selected.has(item.id))
      .map((item) => ingredientName(item.ingredientId));
    Alert.alert(`Удалить ${formatProducts(selected.size)}?`, `${shortList(names)}. Отменить это нельзя.`, [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: () => {
          removeItems([...selected]);
          setSelected(null);
        },
      },
    ]);
  };

  const confirmThrowAway = () => {
    const names = digest.expired.map((entry) => ingredientName(entry.ingredientId));
    Alert.alert(
      'Выбросить просроченное?',
      `${shortList(names)}. Уйдут только просроченные партии — свежие останутся в холодильнике.`,
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выбросить', style: 'destructive', onPress: removeExpired },
      ],
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          items.length > 0 ? (
            <View style={styles.listHeader}>
              {selected ? null : (
                <ExpiryBanner
                  digest={digest}
                  onThrowAway={confirmThrowAway}
                  onCook={() => router.navigate('/recipes')}
                />
              )}
              <View style={styles.toolbar}>
                <ThemedText type="small" themeColor="textSecondary">
                  {selected ? `Выбрано: ${selected.size}` : formatProducts(items.length)}
                </ThemedText>
                <View style={styles.grow} />
                {selected ? (
                  <TextButton
                    label={allSelected ? 'Снять все' : 'Выбрать все'}
                    onPress={() =>
                      setSelected(allSelected ? new Set() : new Set(items.map((item) => item.id)))
                    }
                  />
                ) : null}
                <TextButton
                  label={selected ? 'Отмена' : 'Выбрать'}
                  onPress={() => setSelected(selected ? null : new Set())}
                />
              </View>
            </View>
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
          <CategoryHeader
            section={section}
            selecting={selecting}
            onPress={() => toggleCategory(section.title)}
          />
        )}
        renderItem={({ item, index, section }) => (
          <ProductRow
            item={item}
            first={index === 0}
            last={index === section.data.length - 1}
            selecting={selected !== null}
            selected={selected?.has(item.id) ?? false}
            onPress={(id) => (selected ? toggle(id) : router.push(`/product/${id}`))}
          />
        )}
        // Разделитель внутри блока категории: на подложке строк, с отступом слева.
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: theme.backgroundElement }}>
            <View style={[styles.separator, { backgroundColor: theme.border }]} />
          </View>
        )}
      />

      <View
        style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        {selected ? (
          <PrimaryButton
            title={selected.size > 0 ? `Удалить ${formatProducts(selected.size)}` : 'Отметьте продукты'}
            icon="trash-outline"
            variant="danger"
            disabled={selected.size === 0}
            onPress={confirmDelete}
          />
        ) : (
          <PrimaryButton title="Продиктовать" icon="mic" onPress={() => router.push('/voice')} />
        )}
      </View>
    </View>
  );
}

/**
 * Заголовок категории: нажатие сворачивает её. У свёрнутой видно, сколько внутри
 * продуктов и не истекает ли что-то, — иначе сворачивание прятало бы сроки.
 */
function CategoryHeader({
  section,
  selecting,
  onPress,
}: {
  section: Section;
  selecting: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();
  const alerts = section.collapsed
    ? [
        section.expired > 0 ? { text: `просрочено: ${section.expired}`, color: theme.danger } : null,
        section.soon > 0 ? { text: `скоро истекает: ${section.soon}`, color: theme.warning } : null,
      ].filter((alert) => alert !== null)
    : [];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded: !section.collapsed, disabled: selecting }}
      disabled={selecting}
      onPress={onPress}
      style={({ pressed }) => [styles.sectionHeader, { opacity: pressed ? 0.6 : 1 }]}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {section.title.toUpperCase()} · {section.count}
      </ThemedText>
      {alerts.map((alert) => (
        <ThemedText key={alert.text} type="small" numberOfLines={1} style={{ color: alert.color }}>
          {alert.text}
        </ThemedText>
      ))}
      <View style={styles.grow} />
      {selecting ? null : (
        <Ionicons
          name={section.collapsed ? 'chevron-down' : 'chevron-up'}
          size={16}
          color={theme.textSecondary}
        />
      )}
    </Pressable>
  );
}

function TextButton({ label, onPress }: { label: string; onPress: () => void }) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={Spacing.two}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
      <ThemedText type="small" style={[styles.textButton, { color: theme.accent }]}>
        {label}
      </ThemedText>
    </Pressable>
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
  listHeader: {
    gap: Spacing.three,
    paddingTop: Spacing.two,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.one,
  },
  grow: {
    flex: 1,
  },
  textButton: {
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  sectionTitle: {
    letterSpacing: 0.6,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: Spacing.three,
  },
  footer: {
    padding: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
