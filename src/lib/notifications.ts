import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { planReminders, type ReminderItem } from './reminders';

/**
 * Мост между расписанием из reminders.ts и системными уведомлениями.
 * Здесь всё, что зависит от телефона: канал, разрешение, планирование.
 */

/** Канал Android: его название пользователь видит в настройках уведомлений приложения. */
const CHANNEL_ID = 'expiry';

/** Через сколько приходит пробное уведомление из настроек. */
const TEST_DELAY_MS = 5000;

export type ReminderPermission = 'granted' | 'undetermined' | 'denied';

// Показывать напоминание, даже если в момент доставки приложение открыто. Тихо:
// о сроках не нужно кричать, достаточно записи в шторке.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

let channel: Promise<unknown> | null = null;

/**
 * На Android 13+ канал нужно создать до запроса разрешения, иначе система
 * не покажет диалог. Создаётся один раз за запуск.
 */
function ensureChannel(): Promise<unknown> {
  if (Platform.OS !== 'android') {
    return Promise.resolve();
  }
  channel ??= Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: 'Сроки годности',
    importance: Notifications.AndroidImportance.DEFAULT,
  });
  return channel;
}

/** «Запрещено» — только когда спросить снова нельзя и нужны системные настройки. */
function toPermission({ granted, canAskAgain }: { granted: boolean; canAskAgain: boolean }): ReminderPermission {
  if (granted) {
    return 'granted';
  }
  return canAskAgain ? 'undetermined' : 'denied';
}

export async function reminderPermission(): Promise<ReminderPermission> {
  return toPermission(await Notifications.getPermissionsAsync());
}

export async function requestReminderPermission(): Promise<ReminderPermission> {
  await ensureChannel();
  return toPermission(await Notifications.requestPermissionsAsync());
}

// Сами спрашиваем не больше раза за запуск: отказ — это ответ, а не повод
// переспрашивать при каждом изменении холодильника.
let askedThisLaunch = false;

async function applyReminders(items: ReminderItem[], enabled: boolean): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (!enabled) {
    return;
  }

  const plan = planReminders(items);
  if (plan.length === 0) {
    return;
  }

  let permission = await reminderPermission();
  // Разрешение спрашиваем, когда напоминание впервые понадобилось — сразу
  // после того, как у продукта появился срок. Так запрос понятен без объяснений.
  if (permission === 'undetermined' && !askedThisLaunch) {
    askedThisLaunch = true;
    permission = await requestReminderPermission();
  }
  if (permission !== 'granted') {
    return;
  }

  await ensureChannel();
  for (const reminder of plan) {
    await Notifications.scheduleNotificationAsync({
      content: { title: reminder.title, body: reminder.body },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: reminder.date,
        channelId: CHANNEL_ID,
      },
    });
  }
}

let queue: Promise<void> = Promise.resolve();

/**
 * Пересобирает расписание целиком: отменяет запланированное и ставит заново
 * по текущему холодильнику. Вызовы выстраиваются в очередь, поэтому при
 * быстрых изменениях подряд побеждает последнее состояние.
 */
export function syncReminders(items: ReminderItem[], enabled: boolean): Promise<void> {
  queue = queue
    .then(() => applyReminders(items, enabled))
    .catch(() => {
      // Напоминания не критичны: при следующем изменении холодильника попробуем снова.
    });
  return queue;
}

/** Пробное уведомление через несколько секунд — убедиться, что напоминания доходят. */
export async function sendTestReminder(): Promise<ReminderPermission> {
  let permission = await reminderPermission();
  if (permission === 'undetermined') {
    permission = await requestReminderPermission();
  }
  if (permission !== 'granted') {
    return permission;
  }

  await ensureChannel();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Доешь',
      body: 'Так будут выглядеть напоминания о сроках годности.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: Date.now() + TEST_DELAY_MS,
      channelId: CHANNEL_ID,
    },
  });
  return permission;
}
