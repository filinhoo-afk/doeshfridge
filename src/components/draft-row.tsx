import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { getIngredient, ingredientName } from '@/data/ingredients';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatQuantity, quantityStep } from '@/lib/format';
import type { DraftItem } from '@/store/fridge';

import { CategoryIcon } from './category-icon';
import { StepperButton } from './stepper-button';
import { ThemedText } from './themed-text';

type DraftRowProps = {
  draft: DraftItem;
  onChange: (next: DraftItem) => void;
  onRemove: () => void;
};

/** Строка черновика внутри ListGroup: подложку и разделители даёт группа. */
export function DraftRow({ draft, onChange, onRemove }: DraftRowProps) {
  const theme = useTheme();
  const ingredient = getIngredient(draft.ingredientId);
  const unit = draft.unit ?? ingredient?.defaultUnit ?? null;
  const step = quantityStep(unit);

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
    <View style={styles.row}>
      {ingredient ? <CategoryIcon category={ingredient.category} /> : null}
      <ThemedText style={styles.name} numberOfLines={2}>
        {ingredientName(draft.ingredientId)}
      </ThemedText>

      <View style={styles.stepper}>
        <StepperButton icon="remove" onPress={() => change(-step)} />
        <ThemedText type="small" themeColor="textSecondary" style={styles.quantity}>
          {/* Не «—»: между кнопками «−» и «+» прочерк сам выглядит как минус. */}
          {formatQuantity(draft.quantity, draft.unit) || 'кол-во'}
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 52,
    paddingVertical: Spacing.two,
    paddingLeft: Spacing.three,
    paddingRight: Spacing.two,
  },
  name: {
    flex: 1,
    fontWeight: '600',
    marginLeft: Spacing.one,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  quantity: {
    minWidth: 58,
    textAlign: 'center',
  },
  remove: {
    padding: Spacing.one,
  },
});
