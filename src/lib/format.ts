import type { Unit } from '@/data/ingredients';

/** «2 шт», «1,5 кг», «500 мл». Пустая строка, если количество не указано. */
export function formatQuantity(quantity: number | null, unit: Unit | null): string {
  if (quantity === null) {
    return '';
  }

  if (unit === 'г' && quantity >= 1000) {
    return `${formatNumber(quantity / 1000)} кг`;
  }
  if (unit === 'мл' && quantity >= 1000) {
    return `${formatNumber(quantity / 1000)} л`;
  }

  return unit ? `${formatNumber(quantity)} ${unit}` : formatNumber(quantity);
}

function formatNumber(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');
}

/** Шаг изменения количества: штуки по одной, вес и объём — по 50. */
export function quantityStep(unit: Unit | null): number {
  return unit === 'г' || unit === 'мл' ? 50 : 1;
}

/** «25 минут» с правильным окончанием. */
export function formatMinutes(minutes: number): string {
  return `${minutes} ${plural(minutes, 'минута', 'минуты', 'минут')}`;
}

/** «4 порции» с правильным окончанием. */
export function formatServings(servings: number): string {
  return `${servings} ${plural(servings, 'порция', 'порции', 'порций')}`;
}

/** «на 4 порции», «на 1 порцию» — винительный падеж для фраз вроде «пересчитано на …». */
export function formatServingsFor(servings: number): string {
  return `${servings} ${plural(servings, 'порцию', 'порции', 'порций')}`;
}

export function formatProducts(count: number): string {
  return `${count} ${plural(count, 'продукт', 'продукта', 'продуктов')}`;
}

export function plural(count: number, one: string, few: string, many: string): string {
  const mod100 = Math.abs(count) % 100;
  if (mod100 >= 11 && mod100 <= 14) {
    return many;
  }
  const mod10 = mod100 % 10;
  if (mod10 === 1) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return few;
  }
  return many;
}
