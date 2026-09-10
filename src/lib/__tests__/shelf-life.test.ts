import { daysUntil, defaultExpiryDate, expiryLabel, expiryStatus } from '@/data/shelf-life';

const NOW = new Date('2026-09-10T12:00:00.000Z');

function inDays(days: number): string {
  const date = new Date(NOW);
  date.setDate(date.getDate() + days);
  return date.toISOString();
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

  it('молчит, когда до срока далеко', () => {
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

describe('defaultExpiryDate', () => {
  it('даёт скоропортящимся короткий срок', () => {
    expect(daysUntil(defaultExpiryDate('minced_meat', NOW)!, NOW)).toBe(2);
    expect(daysUntil(defaultExpiryDate('milk', NOW)!, NOW)).toBe(5);
  });

  it('не ставит срок базовым продуктам', () => {
    expect(defaultExpiryDate('salt', NOW)).toBeNull();
    expect(defaultExpiryDate('flour', NOW)).toBeNull();
  });
});
