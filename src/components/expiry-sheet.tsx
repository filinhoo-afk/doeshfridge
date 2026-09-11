import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Unit } from '@/data/ingredients';
import { daysUntil, expiryInDays, expiryOnDate, formatExpiryDate } from '@/data/shelf-life';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatQuantity, quantityStep } from '@/lib/format';

import { PrimaryButton } from './primary-button';
import { StepperButton } from './stepper-button';
import { ThemedText } from './themed-text';

const PRESETS = [
  { label: 'Сегодня', days: 0 },
  { label: 'Завтра', days: 1 },
  { label: '3 дня', days: 3 },
  { label: 'Неделя', days: 7 },
  { label: '2 недели', days: 14 },
  { label: 'Месяц', days: 30 },
];

export type ExpirySheetResult = {
  expiresAt: string | null;
  /** Для `edit`: сколько единиц получают срок, `null` — вся партия. Для `new`: размер партии. */
  count: number | null;
};

type ExpirySheetProps = {
  /** Строка под заголовком: что за продукт и какая партия. */
  subtitle: string;
  unit: Unit | null;
  /**
   * `edit` — срок существующей партии; можно задать его части, она отделится.
   * `new` — новая партия, количество обязательно.
   */
  mode: 'edit' | 'new';
  /** Сколько в партии; `null` — количество не указано, делить нечего. */
  available: number | null;
  initialExpiry: string | null;
  onCancel: () => void;
  onSave: (result: ExpirySheetResult) => void;
};

/**
 * Окно выбора срока. Монтируется только на время показа, поэтому начальное
 * состояние берётся из пропсов при создании — без синхронизации в эффектах.
 */
export function ExpirySheet({
  subtitle,
  unit,
  mode,
  available,
  initialExpiry,
  onCancel,
  onSave,
}: ExpirySheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const step = quantityStep(unit);

  const [expiresAt, setExpiresAt] = useState<string | null>(initialExpiry);
  // По умолчанию срок ставится на всю партию: самый частый случай — одна пачка
  // с одной датой. Чтобы отделить часть, счётчик уменьшают.
  const [count, setCount] = useState<number>(mode === 'new' ? step : (available ?? step));
  const [showIosPicker, setShowIosPicker] = useState(false);

  const canSplit = mode === 'edit' && available !== null && available > step;
  const maxCount = mode === 'edit' && available !== null ? available : Number.POSITIVE_INFINITY;

  const selectedDays = expiresAt === null ? null : daysUntil(expiresAt);
  const isPreset = PRESETS.some((preset) => preset.days === selectedDays);
  const isCustomDate = expiresAt !== null && !isPreset;

  const openCalendar = () => {
    const value = expiresAt ? new Date(expiresAt) : new Date();
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value,
        mode: 'date',
        minimumDate: new Date(),
        onChange: (event, date) => {
          if (event.type === 'set' && date) {
            setExpiresAt(expiryOnDate(date));
          }
        },
      });
    } else {
      setShowIosPicker(true);
    }
  };

  const changeCount = (delta: number) =>
    setCount((current) => Math.min(Math.max(current + delta, step), maxCount));

  const rest = available !== null ? Math.round((available - count) * 1000) / 1000 : 0;
  const restHint =
    canSplit && rest > 0
      ? initialExpiry
        ? `остальные ${formatQuantity(rest, unit)} — ${formatExpiryDate(initialExpiry)}`
        : `остальные ${formatQuantity(rest, unit)} останутся без срока`
      : null;

  const save = () => {
    if (mode === 'new') {
      onSave({ expiresAt, count });
    } else {
      onSave({ expiresAt, count: canSplit ? count : null });
    }
  };

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onCancel} statusBarTranslucent>
      <View style={styles.overlay}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Закрыть"
          style={StyleSheet.absoluteFill}
          onPress={onCancel}
        />
        <View
          style={[
            styles.sheet,
            { backgroundColor: theme.background, paddingBottom: insets.bottom + Spacing.three },
          ]}>
          <View>
            <ThemedText style={styles.title}>{mode === 'new' ? 'Новая партия' : 'Срок годности'}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {subtitle}
            </ThemedText>
          </View>

          <View style={styles.chips}>
            {PRESETS.map((preset) => (
              <Chip
                key={preset.days}
                label={preset.label}
                active={selectedDays === preset.days}
                onPress={() => setExpiresAt(expiryInDays(preset.days))}
              />
            ))}
            <Chip
              label={isCustomDate && expiresAt ? formatExpiryDate(expiresAt, { short: true }) : 'Дата…'}
              active={isCustomDate}
              onPress={openCalendar}
            />
            <Chip label="Без срока" active={expiresAt === null} onPress={() => setExpiresAt(null)} />
          </View>

          {showIosPicker ? (
            <DateTimePicker
              value={expiresAt ? new Date(expiresAt) : new Date()}
              mode="date"
              display="inline"
              minimumDate={new Date()}
              onChange={(_, date) => {
                if (date) {
                  setExpiresAt(expiryOnDate(date));
                }
              }}
            />
          ) : null}

          <ThemedText type="small" themeColor="textSecondary">
            {expiresAt ? `Срок: ${formatExpiryDate(expiresAt)}` : 'Срок не указан — продукт хранится бессрочно'}
          </ThemedText>

          {mode === 'new' || canSplit ? (
            <View style={styles.countBlock}>
              <ThemedText type="small">
                {mode === 'new'
                  ? 'Сколько?'
                  : unit === 'шт'
                    ? 'Для скольких штук?'
                    : 'Для какого количества?'}
              </ThemedText>
              <View style={styles.stepper}>
                <StepperButton icon="remove" onPress={() => changeCount(-step)} />
                <ThemedText style={styles.count}>
                  {mode === 'new'
                    ? formatQuantity(count, unit)
                    : `${formatQuantity(count, unit)} из ${formatQuantity(available, unit)}`}
                </ThemedText>
                <StepperButton icon="add" onPress={() => changeCount(step)} />
              </View>
              {restHint ? (
                <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
                  {restHint}
                </ThemedText>
              ) : null}
            </View>
          ) : null}

          <View style={styles.actions}>
            <PrimaryButton title="Отмена" variant="outline" onPress={onCancel} style={styles.action} />
            <PrimaryButton title="Сохранить" onPress={save} style={styles.action} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

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
          backgroundColor: active ? theme.accent : 'transparent',
          borderColor: active ? theme.accent : theme.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}>
      <ThemedText type="small" style={{ color: active ? theme.onAccent : theme.text }}>
        {label}
      </ThemedText>
    </Pressable>
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
    borderTopLeftRadius: Spacing.four,
    borderTopRightRadius: Spacing.four,
    padding: Spacing.four,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    borderWidth: 1,
    borderRadius: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },
  countBlock: {
    gap: Spacing.two,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  count: {
    minWidth: 96,
    textAlign: 'center',
    fontWeight: '600',
  },
  center: {
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  action: {
    flex: 1,
  },
});
