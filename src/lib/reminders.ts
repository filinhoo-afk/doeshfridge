import { ingredientName } from '@/data/ingredients';
import { daysUntil } from '@/data/shelf-life';

import type { Batch } from './batches';

/**
 * Расписание напоминаний о сроках. Чистая функция: на вход продукты и «сейчас»,
 * на выход список уведомлений. Планирует их src/lib/notifications.ts — так
 * логику можно проверить тестами без телефона.
 */

/** Минимум, нужный от продукта: сюда не тянется всё хранилище. */
export type ReminderItem = {
  ingredientId: string;
  batches: Batch[];
};

export type PlannedReminder = {
  date: Date;
  title: string;
  body: string;
};

/** Во сколько приходит утренняя сводка. */
export const REMINDER_HOUR = 10;

/** Больше вперёд не планируем: у Android ограничено число будильников приложения. */
const MAX_REMINDERS = 50;

/** Сколько продуктов называть по имени, остальные — «и ещё N». */
const NAMES_SHOWN = 3;

function morningOf(dayOffset: number, now: Date): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset, REMINDER_HOUR);
}

function listNames(ingredientIds: string[]): string {
  const names = [...new Set(ingredientIds)].map(ingredientName);
  const shown = names.slice(0, NAMES_SHOWN).join(', ');
  const rest = names.length - NAMES_SHOWN;
  return rest > 0 ? `${shown} и ещё ${rest}` : shown;
}

function compose(expiring: string[], expired: string[]): Pick<PlannedReminder, 'title' | 'body'> {
  if (expiring.length > 0 && expired.length > 0) {
    return {
      title: 'Проверьте холодильник',
      body: `Доешь сегодня: ${listNames(expiring)}. Пора выбросить: ${listNames(expired)}.`,
    };
  }
  if (expiring.length > 0) {
    return { title: 'Сегодня истекает срок', body: `Доешь сегодня: ${listNames(expiring)}.` };
  }
  return { title: 'Пора выбросить', body: `Срок вышел вчера: ${listNames(expired)}.` };
}

/**
 * Одна сводка на каждый день, когда есть что сказать:
 *   • в день срока — «Доешь сегодня: …»;
 *   • наутро после срока — «Пора выбросить: …».
 *
 * Не больше одного уведомления в день: отдельные записи про колбасу и про
 * молоко — уже шум. Прошедшее время не планируется: о том, что просрочено
 * прямо сейчас, скажет плашка в холодильнике.
 */
export function planReminders(items: ReminderItem[], now: Date = new Date()): PlannedReminder[] {
  const days = new Map<number, { expiring: string[]; expired: string[] }>();
  const on = (offset: number) => {
    let day = days.get(offset);
    if (!day) {
      day = { expiring: [], expired: [] };
      days.set(offset, day);
    }
    return day;
  };

  for (const item of items) {
    for (const batch of item.batches) {
      if (!batch.expiresAt) {
        continue;
      }
      const offset = daysUntil(batch.expiresAt, now);
      on(offset).expiring.push(item.ingredientId);
      on(offset + 1).expired.push(item.ingredientId);
    }
  }

  return [...days.entries()]
    .map(([offset, day]) => ({ date: morningOf(offset, now), ...compose(day.expiring, day.expired) }))
    .filter((reminder) => reminder.date.getTime() > now.getTime())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, MAX_REMINDERS);
}
