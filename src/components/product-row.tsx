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
  /** Режим выбора: вместо стрелки в карточку — отметка. */
  selecting?: boolean;
  selected?: boolean;
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

export function ProductRow({ item, onPress, selecting = false, selected = false }: ProductRowProps) {
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
  const others = otherBatchesLine(item);

  return (
    <Pressable
      accessibilityRole={selecting ? 'checkbox' : 'button'}
      accessibilityState={selecting ? { checked: selected } : undefined}
      accessibilityLabel={selecting ? name : `${name}, открыть`}
      onPress={() => onPress(item.id)}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: selected ? theme.backgroundSelected : theme.backgroundElement,
          opacity: pressed ? 0.7 : 1,
        },
      ]}>
      {selecting ? (
        <Ionicons
          name={selected ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={selected ? theme.accent : theme.textSecondary}
        />
      ) : null}

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <ThemedText style={styles.name}>{name}</ThemedText>
          {quantity ? (
            <ThemedText type="small" themeColor="textSecondary">
              {quantity}
            </ThemedText>
          ) : null}
        </View>

        {soon ? <ExpiryBadge expiresAt={nearestDate} prefix={prefix} /> : null}
        {nearestDate && !soon ? (
          <ThemedText type="small" themeColor="textSecondary">
            {formatExpiryDate(nearestDate, { short: true })}
          </ThemedText>
        ) : null}
        {others ? (
          <ThemedText type="small" themeColor="textSecondary">
            {others}
          </ThemedText>
        ) : null}
      </View>

      {selecting ? null : <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.two,
    paddingLeft: Spacing.three,
    paddingRight: Spacing.two,
  },
  info: {
    flex: 1,
    gap: Spacing.one,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.two,
  },
  name: {
    fontWeight: '600',
  },
});
