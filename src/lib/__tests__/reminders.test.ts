import { expiryOnDate } from '@/data/shelf-life';

import { planReminders, type PlannedReminder, type ReminderItem } from '../reminders';

/** 11 сентября, 9:00 — до утренней сводки. */
const NOW = new Date(2026, 8, 11, 9, 0);

/** Срок на день сентября — по местному календарю, как его ставит приложение. */
function sep(day: number): string {
  return expiryOnDate(new Date(2026, 8, day));
}

function item(ingredientId: string, ...dates: (string | null)[]): ReminderItem {
  return {
    ingredientId,
    batches: dates.map((expiresAt, index) => ({ id: `${ingredientId}-${index}`, quantity: 1, expiresAt })),
  };
}

/** Напоминания одной строкой: «13.9 10:00 Заголовок — текст». */
function brief(plan: PlannedReminder[]): string[] {
  return plan.map(
    (reminder) =>
      `${reminder.date.getDate()}.${reminder.date.getMonth() + 1} ${reminder.date.getHours()}:00 ${reminder.title} — ${reminder.body}`,
  );
}

describe('planReminders', () => {
  it('напоминает в день срока и наутро после', () => {
    expect(brief(planReminders([item('sausage', sep(13))], NOW))).toEqual([
      '13.9 10:00 Сегодня истекает срок — Доешь сегодня: колбаса.',
      '14.9 10:00 Пора выбросить — Срок вышел вчера: колбаса.',
    ]);
  });

  it('сводит продукты одного дня в одно уведомление', () => {
    const plan = planReminders([item('sausage', sep(13)), item('milk', sep(13))], NOW);

    expect(brief(plan)).toEqual([
      '13.9 10:00 Сегодня истекает срок — Доешь сегодня: колбаса, молоко.',
      '14.9 10:00 Пора выбросить — Срок вышел вчера: колбаса, молоко.',
    ]);
  });

  it('объединяет «доешь» и «выбросить», если они выпали на один день', () => {
    const plan = planReminders([item('milk', sep(12)), item('sausage', sep(13))], NOW);

    expect(brief(plan)[1]).toBe(
      '13.9 10:00 Проверьте холодильник — Доешь сегодня: колбаса. Пора выбросить: молоко.',
    );
  });

  it('планирует сегодняшнюю сводку, только пока 10:00 не прошло', () => {
    const today = [item('sausage', sep(11))];

    expect(brief(planReminders(today, NOW))[0]).toMatch(/^11\.9 10:00 Сегодня истекает/);
    expect(brief(planReminders(today, new Date(2026, 8, 11, 11, 0)))).toEqual([
      '12.9 10:00 Пора выбросить — Срок вышел вчера: колбаса.',
    ]);
  });

  it('молчит о давно просроченном и о продуктах без срока', () => {
    // О просроченном прямо сейчас скажет плашка в холодильнике.
    expect(planReminders([item('sausage', sep(5)), item('egg', null)], NOW)).toEqual([]);
  });

  it('называет не больше трёх продуктов', () => {
    const plan = planReminders(
      ['egg', 'cheese', 'tomato', 'cucumber', 'potato'].map((id) => item(id, sep(13))),
      NOW,
    );

    expect(plan[0].body).toBe('Доешь сегодня: яйца, сыр, помидоры и ещё 2.');
  });

  it('упоминает продукт один раз, даже если партий несколько', () => {
    const plan = planReminders([item('sausage', sep(13), sep(13))], NOW);

    expect(plan[0].body).toBe('Доешь сегодня: колбаса.');
  });
});
