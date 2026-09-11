import { useEffect, useState } from 'react';
import { Alert, AppState, Linking, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { PrimaryButton } from '@/components/primary-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { INGREDIENTS } from '@/data/ingredients';
import { RECIPES } from '@/data/recipes';
import { useTheme } from '@/hooks/use-theme';
import { formatProducts } from '@/lib/format';
import {
  reminderPermission,
  requestReminderPermission,
  sendTestReminder,
  type ReminderPermission,
} from '@/lib/notifications';
import { REMINDER_HOUR } from '@/lib/reminders';
import { useFridge } from '@/store/fridge';

const PANTRY_NAMES = INGREDIENTS.filter((ingredient) => ingredient.pantry)
  .map((ingredient) => ingredient.name)
  .join(', ');

/** Разрешение на уведомления; перечитывается, когда пользователь возвращается из системных настроек. */
function useReminderPermission() {
  const [permission, setPermission] = useState<ReminderPermission | null>(null);

  useEffect(() => {
    let alive = true;
    const refresh = () => {
      void reminderPermission().then((value) => {
        if (alive) {
          setPermission(value);
        }
      });
    };
    refresh();
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        refresh();
      }
    });
    return () => {
      alive = false;
      subscription.remove();
    };
  }, []);

  return [permission, setPermission] as const;
}

export default function SettingsScreen() {
  const theme = useTheme();
  const items = useFridge((state) => state.items);
  const assumePantry = useFridge((state) => state.assumePantry);
  const setAssumePantry = useFridge((state) => state.setAssumePantry);
  const remindersEnabled = useFridge((state) => state.remindersEnabled);
  const setRemindersEnabled = useFridge((state) => state.setRemindersEnabled);
  const clearAll = useFridge((state) => state.clearAll);

  const [permission, setPermission] = useReminderPermission();
  const [testSent, setTestSent] = useState(false);

  const toggleReminders = (value: boolean) => {
    setRemindersEnabled(value);
    // Включили — спрашиваем разрешение сразу: намерение понятно без объяснений.
    if (value) {
      void requestReminderPermission().then(setPermission);
    }
  };

  const sendTest = async () => {
    const result = await sendTestReminder();
    setPermission(result);
    setTestSent(result === 'granted');
  };

  const confirmClear = () => {
    if (items.length === 0) {
      return;
    }
    Alert.alert(
      'Очистить холодильник?',
      `Будут удалены все ${formatProducts(items.length)}. Отменить это нельзя.`,
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Очистить', style: 'destructive', onPress: clearAll },
      ],
    );
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        <View style={styles.switchRow}>
          <View style={styles.switchLabel}>
            <ThemedText style={styles.title}>Напоминания о сроках</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              В день срока — «доешь сегодня», наутро после — «пора выбросить». Не больше одной
              сводки в день, в {REMINDER_HOUR}:00.
            </ThemedText>
          </View>
          <Switch
            value={remindersEnabled}
            onValueChange={toggleReminders}
            trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
            thumbColor={theme.background}
          />
        </View>

        {remindersEnabled && permission === 'denied' ? (
          <View style={styles.block}>
            <ThemedText type="small" themeColor="warning">
              Уведомления запрещены в настройках Android — напоминания не придут.
            </ThemedText>
            <PrimaryButton
              title="Открыть настройки Android"
              icon="open-outline"
              variant="outline"
              onPress={() => void Linking.openSettings()}
            />
          </View>
        ) : null}

        {remindersEnabled && permission !== 'denied' ? (
          <View style={styles.block}>
            <PrimaryButton
              title="Прислать пробное уведомление"
              icon="notifications-outline"
              variant="outline"
              onPress={() => void sendTest()}
            />
            {testSent ? (
              <ThemedText type="small" themeColor="textSecondary">
                Придёт через несколько секунд — можно свернуть приложение.
              </ThemedText>
            ) : null}
          </View>
        ) : null}
      </View>

      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        <View style={styles.switchRow}>
          <View style={styles.switchLabel}>
            <ThemedText style={styles.title}>Базовые продукты всегда есть</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Соль, мука, масло и специи не считаются недостающими при подборе рецептов.
            </ThemedText>
          </View>
          <Switch
            value={assumePantry}
            onValueChange={setAssumePantry}
            trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
            thumbColor={theme.background}
          />
        </View>
        <ThemedText type="small" themeColor="textSecondary">
          {PANTRY_NAMES}
        </ThemedText>
      </View>

      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText style={styles.title}>База</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {RECIPES.length} рецептов и {INGREDIENTS.length} продуктов в справочнике. Всё хранится на
          устройстве: без аккаунта, без интернета, без отправки данных куда-либо.
        </ThemedText>
      </View>

      <PrimaryButton
        title="Очистить холодильник"
        icon="trash-outline"
        variant="danger"
        disabled={items.length === 0}
        onPress={confirmClear}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  card: {
    gap: Spacing.two,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  switchLabel: {
    flex: 1,
    gap: Spacing.one,
  },
  block: {
    gap: Spacing.two,
  },
  title: {
    fontWeight: '600',
  },
});
