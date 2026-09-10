import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ingredientName } from '@/data/ingredients';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatQuantity } from '@/lib/format';
import type { FridgeItem } from '@/store/fridge';

import { ExpiryBadge } from './expiry-badge';
import { ThemedText } from './themed-text';

type ProductRowProps = {
  item: FridgeItem;
  onRemove: (id: string) => void;
};

export function ProductRow({ item, onRemove }: ProductRowProps) {
  const theme = useTheme();
  const quantity = formatQuantity(item.quantity, item.unit);

  return (
    <View style={[styles.row, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <ThemedText style={styles.name}>{ingredientName(item.ingredientId)}</ThemedText>
          {quantity ? (
            <ThemedText type="small" themeColor="textSecondary">
              {quantity}
            </ThemedText>
          ) : null}
        </View>
        <ExpiryBadge expiresAt={item.expiresAt} />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Убрать ${ingredientName(item.ingredientId)}`}
        hitSlop={Spacing.two}
        onPress={() => onRemove(item.id)}
        style={({ pressed }) => [styles.remove, { opacity: pressed ? 0.5 : 1 }]}>
        <Ionicons name="close" size={20} color={theme.textSecondary} />
      </Pressable>
    </View>
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
  remove: {
    padding: Spacing.two,
  },
});
