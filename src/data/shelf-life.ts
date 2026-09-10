import { CATEGORY_ORDER, getIngredient, type Category } from './ingredients';

/**
 * Сроки хранения по умолчанию, в днях после добавления в холодильник.
 * Это подсказка, а не истина: пользователь правит дату вручную.
 */
const SHELF_LIFE_DAYS: Record<Category, number> = {
  молочное: 5,
  мясо: 2,
  рыба: 2,
  овощи: 10,
  зелень: 4,
  фрукты: 7,
  крупы: 365,
  бакалея: 180,
  заморозка: 90,
};

/** Базовые продукты (соль, мука, масло) не протухают — срок им не ставим. */
export function defaultExpiryDate(ingredientId: string, from: Date = new Date()): string | null {
  const ingredient = getIngredient(ingredientId);
  if (!ingredient || ingredient.pantry) {
    return null;
  }
  const expires = new Date(from);
  expires.setDate(expires.getDate() + SHELF_LIFE_DAYS[ingredient.category]);
  return expires.toISOString();
}

export type ExpiryStatus = 'expired' | 'soon' | 'ok';

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

/** До какого запаса срок вообще стоит показывать. */
const VISIBLE_DAYS = 7;

/**
 * Метка срока или `null`, если до конца ещё далеко. Бейдж «ещё 180 дн.» на пачке
 * крупы — шум: метка должна означать «этим стоит заняться».
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

export { CATEGORY_ORDER };
