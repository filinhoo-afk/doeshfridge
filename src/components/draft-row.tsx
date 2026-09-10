import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { getIngredient, ingredientName, type Unit } from '@/data/ingredients';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatQuantity } from '@/lib/format';
import type { DraftItem } from '@/store/fridge';

import { ThemedText } from './themed-text';

type DraftRowProps = {
  draft: DraftItem;
  onChange: (next: DraftItem) => void;
  onRemove: () => void;
};

/** Шаг изменения количества: штуки по одной, вес и объём — по 50. */
function stepFor(unit: Unit | null): number {
  return unit === 'г' || unit === 'мл' ? 50 : 1;
}

export function DraftRow({ draft, onChange, onRemove }: DraftRowProps) {
  const theme = useTheme();
  const unit = draft.unit ?? getIngredient(draft.ingredientId)?.defaultUnit ?? null;
  const step = stepFor(unit);

  const change = (delta: number) => {
    // Первое нажатие «+» задаёт количество продукту, добавленному без него.
    const current = draft.quantity ?? 0;
    const next = current + delta;
    onChange({
      ...draft,
      quantity: next <= 0 ? null : next,
      unit: next <= 0 ? null : unit,
    });
  };

  return (
    <View style={[styles.row, { backgroundColor: theme.backgroundElement }]}>
      <ThemedText style={styles.name}>{ingredientName(draft.ingredientId)}</ThemedText>

      <View style={styles.stepper}>
        <StepperButton icon="remove" onPress={() => change(-step)} />
        <ThemedText type="small" themeColor="textSecondary" style={styles.quantity}>
          {formatQuantity(draft.quantity, draft.unit) || '—'}
        </ThemedText>
        <StepperButton icon="add" onPress={() => change(step)} />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Убрать ${ingredientName(draft.ingredientId)}`}
        hitSlop={Spacing.two}
        onPress={onRemove}
        style={({ pressed }) => [styles.remove, { opacity: pressed ? 0.5 : 1 }]}>
        <Ionicons name="close" size={20} color={theme.textSecondary} />
      </Pressable>
    </View>
  );
}

function StepperButton({
  icon,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={Spacing.two}
      onPress={onPress}
      style={({ pressed }) => [
        styles.stepperButton,
        { backgroundColor: theme.backgroundSelected, opacity: pressed ? 0.6 : 1 },
      ]}>
      <Ionicons name={icon} size={16} color={theme.text} />
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
  name: {
    flex: 1,
    fontWeight: '600',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  stepperButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    minWidth: 58,
    textAlign: 'center',
  },
  remove: {
    padding: Spacing.one,
  },
});
