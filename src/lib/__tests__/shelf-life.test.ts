import {
  daysUntil,
  expiryInDays,
  expiryLabel,
  expiryOnDate,
  expiryStatus,
  formatExpiryDate,
} from '@/data/shelf-life';

const NOW = new Date('2026-09-10T12:00:00.000Z');

function inDays(days: number): string {
  const date = new Date(NOW);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

/** Дата по местному календарю — чтобы тесты не зависели от часового пояса машины. */
function local(year: number, month: number, day: number): string {
  return expiryOnDate(new Date(year, month - 1, day));
}

describe('daysUntil', () => {
  it('считает календарные дни, а не часы', () => {
    // Через 20 часов, но уже завтра по календарю.
    const tomorrowMorning = new Date(NOW);
    tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
    tomorrowMorning.setHours(8);

    expect(daysUntil(tomorrowMorning.toISOString(), NOW)).toBe(1);
  });
});

describe('expiryInDays и expiryOnDate', () => {
  it('отсчитывает дни от сегодняшнего', () => {
    expect(daysUntil(expiryInDays(0, NOW), NOW)).toBe(0);
    expect(daysUntil(expiryInDays(1, NOW), NOW)).toBe(1);
    expect(daysUntil(expiryInDays(30, NOW), NOW)).toBe(30);
  });

  it('ставит срок на полдень выбранного дня', () => {
    const date = new Date(local(2026, 9, 26));

    expect([date.getDate(), date.getHours()]).toEqual([26, 12]);
  });
});

describe('expiryLabel', () => {
  it('предупреждает о ближайших днях', () => {
    expect(expiryLabel(inDays(0), NOW)).toBe('истекает сегодня');
    expect(expiryLabel(inDays(1), NOW)).toBe('истекает завтра');
    expect(expiryLabel(inDays(3), NOW)).toBe('истекает через 3 дн.');
  });

  it('сообщает о просрочке', () => {
    expect(expiryLabel(inDays(-1), NOW)).toBe('просрочено вчера');
    expect(expiryLabel(inDays(-4), NOW)).toBe('просрочено 4 дн. назад');
  });

  it('молчит, когда до срока далеко или срока нет', () => {
    expect(expiryLabel(inDays(7), NOW)).toBe('ещё 7 дн.');
    expect(expiryLabel(inDays(8), NOW)).toBeNull();
    expect(expiryLabel(inDays(180), NOW)).toBeNull();
    expect(expiryLabel(null, NOW)).toBeNull();
  });
});

describe('expiryStatus', () => {
  it('различает просроченное, скорое и спокойное', () => {
    expect(expiryStatus(inDays(-1), NOW)).toBe('expired');
    expect(expiryStatus(inDays(2), NOW)).toBe('soon');
    expect(expiryStatus(inDays(30), NOW)).toBe('ok');
    expect(expiryStatus(null, NOW)).toBe('ok');
  });
});

describe('formatExpiryDate', () => {
  const today = new Date(2026, 8, 11);

  it('пишет число и месяц в родительном падеже', () => {
    expect(formatExpiryDate(local(2026, 9, 26), { now: today })).toBe('до 26 сентября');
    expect(formatExpiryDate(local(2026, 5, 1), { now: today })).toBe('до 1 мая');
  });

  it('сокращает месяц для списка', () => {
    expect(formatExpiryDate(local(2026, 10, 11), { now: today, short: true })).toBe('до 11 окт');
  });

  it('дописывает год, только если он не текущий', () => {
    expect(formatExpiryDate(local(2027, 1, 3), { now: today })).toBe('до 3 января 2027');
  });
});
