/**
 * Сроки годности: сколько дней осталось, как это назвать и как показать дату.
 *
 * Сроков по умолчанию нет — продукт хранится бессрочно, пока пользователь сам
 * не укажет дату. Раньше срок угадывался по категории («молочное — 5 дней»),
 * но угаданная дата выглядела так же, как настоящая, и только путала.
 */

export type ExpiryStatus = 'expired' | 'soon' | 'ok';

/** До какого запаса срок показывается цветной меткой, дальше — просто датой. */
const VISIBLE_DAYS = 7;

const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

const MONTHS_SHORT = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

/**
 * Срок на выбранный календарный день. Время ставится на полдень: полночь при
 * переводе в UTC и обратно может уехать на соседние сутки.
 */
export function expiryOnDate(date: Date): string {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12).toISOString();
}

/** Срок через `days` дней от сегодня: «Завтра» — 1, «Неделя» — 7. */
export function expiryInDays(days: number, from: Date = new Date()): string {
  return expiryOnDate(new Date(from.getFullYear(), from.getMonth(), from.getDate() + days));
}

/** Целых дней до истечения срока; отрицательное — просрочено. */
export function daysUntil(isoDate: string, now: Date = new Date()): number {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const target = new Date(isoDate);
  const startOfTarget = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate(),
  ).getTime();
  return Math.round((startOfTarget - startOfToday) / millisecondsPerDay);
}

export function expiryStatus(isoDate: string | null, now: Date = new Date()): ExpiryStatus {
  if (!isoDate) {
    return 'ok';
  }
  const days = daysUntil(isoDate, now);
  if (days < 0) {
    return 'expired';
  }
  return days <= 3 ? 'soon' : 'ok';
}

/**
 * Метка срока или `null`, если до конца ещё далеко. Цветная метка должна
 * означать «этим стоит заняться», поэтому дальние сроки показываются датой.
 */
export function expiryLabel(isoDate: string | null, now: Date = new Date()): string | null {
  if (!isoDate) {
    return null;
  }
  const days = daysUntil(isoDate, now);
  if (days < 0) {
    return days === -1 ? 'просрочено вчера' : `просрочено ${-days} дн. назад`;
  }
  if (days === 0) {
    return 'истекает сегодня';
  }
  if (days === 1) {
    return 'истекает завтра';
  }
  if (days <= 3) {
    return `истекает через ${days} дн.`;
  }
  return days <= VISIBLE_DAYS ? `ещё ${days} дн.` : null;
}

/** «до 26 сентября»; год дописывается, только если он не текущий. */
export function formatExpiryDate(
  isoDate: string,
  { short = false, now = new Date() }: { short?: boolean; now?: Date } = {},
): string {
  const date = new Date(isoDate);
  const month = (short ? MONTHS_SHORT : MONTHS)[date.getMonth()];
  const year = date.getFullYear() === now.getFullYear() ? '' : ` ${date.getFullYear()}`;
  return `до ${date.getDate()} ${month}${year}`;
}
