import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ExpiryBadge } from '@/components/expiry-badge';
import { ExpirySheet, type ExpirySheetResult } from '@/components/expiry-sheet';
import { PrimaryButton } from '@/components/primary-button';
import { StepperButton } from '@/components/stepper-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { ingredientName } from '@/data/ingredients';
import { formatExpiryDate } from '@/data/shelf-life';
import { useTheme } from '@/hooks/use-theme';
import { sortByExpiry, totalQuantity, type Batch } from '@/lib/batches';
import { formatQuantity, plural, quantityStep } from '@/lib/format';
import { useFridge } from '@/store/fridge';

type SheetTarget = { mode: 'edit'; batch: Batch } | { mode: 'new' };

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();

  const item = useFridge((state) => state.items.find((candidate) => candidate.id === id));
  const setBatchExpiry = useFridge((state) => state.setBatchExpiry);
  const setBatchQuantity = useFridge((state) => state.setBatchQuantity);
  const addItemBatch = useFridge((state) => state.addItemBatch);
  const removeItemBatch = useFridge((state) => state.removeItemBatch);
  const removeItem = useFridge((state) => state.removeItem);

  const [sheet, setSheet] = useState<SheetTarget | null>(null);

  if (!item) {
    return (
      <View style={[styles.missing, { backgroundColor: theme.background }]}>
        <ThemedText themeColor="textSecondary">Этого продукта больше нет в холодильнике.</ThemedText>
      </View>
    );
  }

  const name = ingredientName(item.ingredientId);
  const batches = sortByExpiry(item.batches);
  const total = totalQuantity(item.batches);
  const step = quantityStep(item.unit);

  const summary = [
    total !== null ? `всего ${formatQuantity(total, item.unit)}` : 'количество не указано',
    batches.length > 1 ? `${batches.length} ${plural(batches.length, 'партия', 'партии', 'партий')}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const describe = (batch: Batch) =>
    [
      formatQuantity(batch.quantity, item.unit),
      batch.expiresAt ? formatExpiryDate(batch.expiresAt) : 'без срока',
    ]
      .filter(Boolean)
      .join(' ');

  // Последняя партия уносит с собой продукт — уходим с экрана заранее,
  // чтобы не показывать на мгновение пустую карточку.
  const leaveIfLast = () => {
    if (item.batches.length === 1) {
      router.back();
    }
  };

  const changeQuantity = (batch: Batch, delta: number) => {
    const next = (batch.quantity ?? 0) + delta;
    if (next <= 0) {
      leaveIfLast();
    }
    setBatchQuantity(item.id, batch.id, next);
  };

  const confirmRemove = () =>
    Alert.alert(`Убрать «${name}»?`, 'Продукт исчезнет из холодильника вместе со всеми партиями.', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Убрать',
        style: 'destructive',
        onPress: () => {
          router.back();
          removeItem(item.id);
        },
      },
    ]);

  const save = ({ expiresAt, count }: ExpirySheetResult) => {
    if (sheet?.mode === 'edit') {
      setBatchExpiry(item.id, sheet.batch.id, expiresAt, count);
    } else if (sheet?.mode === 'new' && count !== null) {
      addItemBatch(item.id, count, expiresAt);
    }
    setSheet(null);
  };

  return (
    <>
      <Stack.Screen options={{ title: name }} />
      <ScrollView style={{ backgroundColor: theme.background }} contentContainerStyle={styles.content}>
        <View>
          <ThemedText type="subtitle">{name}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {summary}
          </ThemedText>
        </View>

        <View style={styles.list}>
          {batches.map((batch) => (
            <View key={batch.id} style={[styles.batch, { backgroundColor: theme.backgroundElement }]}>
              <View style={styles.batchTop}>
                {batch.quantity !== null ? (
                  <View style={styles.stepper}>
                    <StepperButton icon="remove" onPress={() => changeQuantity(batch, -step)} />
                    <ThemedText style={styles.quantity}>{formatQuantity(batch.quantity, item.unit)}</ThemedText>
                    <StepperButton icon="add" onPress={() => changeQuantity(batch, step)} />
                  </View>
                ) : (
                  <ThemedText type="small" themeColor="textSecondary">
                    количество не указано
                  </ThemedText>
                )}
                <View style={styles.grow} />
                {batches.length > 1 ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Убрать партию"
                    hitSlop={Spacing.two}
                    onPress={() => removeItemBatch(item.id, batch.id)}
                    style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
                    <Ionicons name="close" size={20} color={theme.textSecondary} />
                  </Pressable>
                ) : null}
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={batch.expiresAt ? 'Изменить срок' : 'Указать срок'}
                onPress={() => setSheet({ mode: 'edit', batch })}
                style={({ pressed }) => [styles.expiry, { opacity: pressed ? 0.6 : 1 }]}>
                {batch.expiresAt ? (
                  <>
                    <ExpiryBadge expiresAt={batch.expiresAt} />
                    <ThemedText type="small" themeColor="textSecondary">
                      {formatExpiryDate(batch.expiresAt)}
                    </ThemedText>
                  </>
                ) : (
                  <ThemedText type="small" themeColor="accent">
                    без срока · указать
                  </ThemedText>
                )}
                <View style={styles.grow} />
                <Ionicons name="calendar-outline" size={16} color={theme.textSecondary} />
              </Pressable>
            </View>
          ))}

          {total !== null ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => setSheet({ mode: 'new' })}
              style={({ pressed }) => [styles.add, { borderColor: theme.accent, opacity: pressed ? 0.6 : 1 }]}>
              <Ionicons name="add" size={16} color={theme.accent} />
              <ThemedText type="small" themeColor="accent">
                добавить партию
              </ThemedText>
            </Pressable>
          ) : null}
        </View>

        <PrimaryButton
          title="Убрать из холодильника"
          icon="trash-outline"
          variant="danger"
          onPress={confirmRemove}
        />
      </ScrollView>

      {sheet ? (
        <ExpirySheet
          subtitle={sheet.mode === 'edit' ? `${name} · ${describe(sheet.batch)}` : name}
          unit={item.unit}
          mode={sheet.mode}
          available={sheet.mode === 'edit' ? sheet.batch.quantity : null}
          initialExpiry={sheet.mode === 'edit' ? sheet.batch.expiresAt : null}
          onCancel={() => setSheet(null)}
          onSave={save}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  content: {
    padding: Spacing.three,
    gap: Spacing.four,
  },
  list: {
    gap: Spacing.two,
  },
  batch: {
    gap: Spacing.two,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  batchTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  quantity: {
    minWidth: 64,
    textAlign: 'center',
    fontWeight: '600',
  },
  grow: {
    flex: 1,
  },
  expiry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  add: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Spacing.three,
    padding: Spacing.two,
  },
});
