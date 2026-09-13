import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ingredientName } from '@/data/ingredients';
import { expiryLabel, formatExpiryDate } from '@/data/shelf-life';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { nearestDated, sortByExpiry, totalQuantity } from '@/lib/batches';
import { formatQuantity, plural } from '@/lib/format';
import type { FridgeItem } from '@/store/fridge';

import { ExpiryBadge } from './expiry-badge';
import { ThemedText } from './themed-text';

type ProductRowProps = {
  item: FridgeItem;
  onPress: (id: string) => void;
  /** Режим выбора: слева появляется отметка. */
  selecting?: boolean;
  selected?: boolean;
  /** Положение в категории: у первой и последней строки скруглены углы блока. */
  first?: boolean;
  last?: boolean;
};

/** «ещё 2 партии · последняя до 11 окт». Последняя дата — только если сроки есть у всех. */
function otherBatchesLine(item: FridgeItem): string | null {
  const others = item.batches.length - 1;
  if (others <= 0) {
    return null;
  }
  const text = `ещё ${others} ${plural(others, 'партия', 'партии', 'партий')}`;
  const sorted = sortByExpiry(item.batches);
  const latest = sorted[sorted.length - 1].expiresAt;
  const allDated = sorted.every((batch) => batch.expiresAt !== null);
  return allDated && latest ? `${text} · последняя ${formatExpiryDate(latest, { short: true })}` : text;
}

/**
 * Строка продукта внутри блока категории. Всё главное — в одну строку: название,
 * количество и, если срок близко, цветная метка справа. Вторая строка появляется,
 * только когда есть что сказать: дальний срок или другие партии.
 */
export function ProductRow({
  item,
  onPress,
  selecting = false,
  selected = false,
  first = false,
  last = false,
}: ProductRowProps) {
  const theme = useTheme();
  const name = ingredientName(item.ingredientId);
  const quantity = formatQuantity(totalQuantity(item.batches), item.unit);

  const nearest = nearestDated(item.batches);
  const nearestDate = nearest?.expiresAt ?? null;
  const soon = expiryLabel(nearestDate) !== null;
  // «1 шт истекает завтра»: количество уточняем, только когда партий несколько.
  const prefix =
    item.batches.length > 1 && nearest && nearest.quantity !== null
      ? formatQuantity(nearest.quantity, item.unit)
      : undefined;

  const details = [
    nearestDate && !soon ? formatExpiryDate(nearestDate, { short: true }) : null,
    otherBatchesLine(item),
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Pressable
      accessibilityRole={selecting ? 'checkbox' : 'button'}
      accessibilityState={selecting ? { checked: selected } : undefined}
      accessibilityLabel={selecting ? name : `${name}, открыть`}
      onPress={() => onPress(item.id)}
      style={({ pressed }) => [
        styles.row,
        first && styles.first,
        last && styles.last,
        {
          backgroundColor: selected ? theme.backgroundSelected : theme.backgroundElement,
          opacity: pressed ? 0.7 : 1,
        },
      ]}>
      {selecting ? (
        <Ionicons
          name={selected ? 'checkmark-circle' : 'ellipse-outline'}
          size={22}
          color={selected ? theme.accent : theme.textSecondary}
        />
      ) : null}

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <ThemedText style={styles.name} numberOfLines={1}>
            {name}
          </ThemedText>
          {quantity ? (
            <ThemedText type="small" themeColor="textSecondary">
              {quantity}
            </ThemedText>
          ) : null}
          <View style={styles.grow} />
          {/* Обёртка: метка сама прижимается к верху (alignSelf), а здесь нужна середина строки. */}
          {soon ? (
            <View>
              <ExpiryBadge expiresAt={nearestDate} prefix={prefix} />
            </View>
          ) : null}
        </View>

        {details ? (
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
            {details}
          </ThemedText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 48,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  first: {
    borderTopLeftRadius: Spacing.three,
    borderTopRightRadius: Spacing.three,
  },
  last: {
    borderBottomLeftRadius: Spacing.three,
    borderBottomRightRadius: Spacing.three,
  },
  info: {
    flex: 1,
    gap: Spacing.half,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  name: {
    flexShrink: 1,
    fontWeight: '600',
  },
  grow: {
    flex: 1,
  },
});
