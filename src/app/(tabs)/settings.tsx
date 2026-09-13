import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, AppState, Linking, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { ListGroup, ListRow } from '@/components/list-group';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { INGREDIENTS } from '@/data/ingredients';
import { RECIPE_PHOTOS } from '@/data/recipe-photos';
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
import { usePreferences, type ThemePreference } from '@/store/preferences';

const THEME_OPTIONS: { value: ThemePreference; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { value: 'system', label: 'Системная', icon: 'phone-portrait-outline' },
  { value: 'light', label: 'Светлая', icon: 'sunny-outline' },
  { value: 'dark', label: 'Тёмная', icon: 'moon-outline' },
];

/** Три кнопки в ряд: выбранная — на мягкой оранжевой подложке. */
function ThemePicker() {
  const theme = useTheme();
  const current = usePreferences((state) => state.theme);
  const setTheme = usePreferences((state) => state.setTheme);

  return (
    <View style={styles.themePicker}>
      {THEME_OPTIONS.map((option) => {
        const selected = option.value === current;
        const color = selected ? theme.accent : theme.textSecondary;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            onPress={() => setTheme(option.value)}
            style={({ pressed }) => [
              styles.themeOption,
              { backgroundColor: selected ? theme.accentSoft : 'transparent', opacity: pressed ? 0.7 : 1 },
            ]}>
            <Ionicons name={option.icon} size={20} color={color} />
            <ThemedText type="small" style={[styles.themeLabel, { color }]}>
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const PANTRY = INGREDIENTS.filter((ingredient) => ingredient.pantry).map((ingredient) => ingredient.name);
const PANTRY_NAMES = PANTRY.join(', ');

const PHOTO_COUNT = Object.values(RECIPE_PHOTOS).filter((photo) => photo.credit).length;

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
  const router = useRouter();
  const items = useFridge((state) => state.items);
  const assumePantry = useFridge((state) => state.assumePantry);
  const setAssumePantry = useFridge((state) => state.setAssumePantry);
  const remindersEnabled = useFridge((state) => state.remindersEnabled);
  const setRemindersEnabled = useFridge((state) => state.setRemindersEnabled);
  const clearAll = useFridge((state) => state.clearAll);

  const [permission, setPermission] = useReminderPermission();
  const [testSent, setTestSent] = useState(false);
  // Список базовых продуктов длинный — по умолчанию свёрнут.
  const [pantryOpen, setPantryOpen] = useState(false);

  const switchColors = { false: theme.backgroundSelected, true: theme.accent };

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
      <ListGroup title="Оформление">
        <ThemePicker />
      </ListGroup>

      <ListGroup title="Напоминания">
        <ListRow
          title="Сроки годности"
          // Неразрывный пробел: время не отрывается от предлога при переносе.
          subtitle={`В день срока и наутро после, в\u00A0${REMINDER_HOUR}:00`}
          onPress={() => toggleReminders(!remindersEnabled)}
          accessory={
            <Switch
              value={remindersEnabled}
              onValueChange={toggleReminders}
              trackColor={switchColors}
              thumbColor={theme.background}
            />
          }
        />
        {remindersEnabled && permission === 'denied' ? (
          <ListRow
            title="Уведомления запрещены"
            subtitle="Напоминания не придут. Открыть настройки Android"
            tone="danger"
            trailingIcon="open-outline"
            onPress={() => void Linking.openSettings()}
          />
        ) : null}
        {remindersEnabled && permission !== 'denied' ? (
          <ListRow
            title="Прислать пробное"
            subtitle={testSent ? 'Придёт через несколько секунд' : undefined}
            tone="accent"
            onPress={() => void sendTest()}
          />
        ) : null}
      </ListGroup>

      <ListGroup title="Подбор рецептов">
        <ListRow
          title="Базовые продукты"
          subtitle="Считать, что всегда есть"
          onPress={() => setAssumePantry(!assumePantry)}
          accessory={
            <Switch
              value={assumePantry}
              onValueChange={setAssumePantry}
              trackColor={switchColors}
              thumbColor={theme.background}
            />
          }
        />
        <ListRow
          title={`Какие это продукты — ${PANTRY.length}`}
          subtitle={pantryOpen ? PANTRY_NAMES : undefined}
          trailingIcon={pantryOpen ? 'chevron-up' : 'chevron-down'}
          onPress={() => setPantryOpen(!pantryOpen)}
        />
      </ListGroup>

      <ListGroup
        title="Приложение"
        footer={`${RECIPES.length} рецептов и ${INGREDIENTS.length} продуктов. Всё хранится на телефоне — без аккаунта и интернета.`}>
        <ListRow title="Как это работает" onPress={() => router.push('/welcome')} />
        {PHOTO_COUNT > 0 ? (
          <ListRow title="Авторы фото блюд" onPress={() => router.push('/photo-credits')} />
        ) : null}
      </ListGroup>

      <ListGroup>
        <ListRow
          title="Очистить холодильник"
          tone="danger"
          disabled={items.length === 0}
          onPress={confirmClear}
        />
      </ListGroup>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.three,
    gap: Spacing.four,
  },
  themePicker: {
    flexDirection: 'row',
    gap: Spacing.one,
    padding: Spacing.one,
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.half,
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two,
  },
  themeLabel: {
    fontWeight: '600',
  },
});
