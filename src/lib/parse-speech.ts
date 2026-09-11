import { getIngredient, type Unit } from '@/data/ingredients';

import { lookupPhrase, MAX_PHRASE_WORDS } from './ingredient-index';
import { tokenize } from './normalize';

export type ParsedItem = {
  ingredientId: string;
  quantity: number | null;
  unit: Unit | null;
};

export type ParseResult = {
  items: ParsedItem[];
  /** Фрагменты, которые не удалось опознать — показываем пользователю для правки. */
  unrecognized: string[];
};

const NUMERALS: Record<string, number> = {
  ноль: 0,
  пол: 0.5,
  полтора: 1.5,
  полторы: 1.5,
  один: 1,
  одна: 1,
  одно: 1,
  одну: 1,
  два: 2,
  две: 2,
  двух: 2,
  пара: 2,
  пары: 2,
  пару: 2,
  три: 3,
  трех: 3,
  четыре: 4,
  четырех: 4,
  пять: 5,
  пяти: 5,
  шесть: 6,
  шести: 6,
  семь: 7,
  восемь: 8,
  девять: 9,
  десять: 10,
  десяток: 10,
  одиннадцать: 11,
  двенадцать: 12,
  пятнадцать: 15,
  двадцать: 20,
  тридцать: 30,
  сорок: 40,
  пятьдесят: 50,
  шестьдесят: 60,
  семьдесят: 70,
  восемьдесят: 80,
  девяносто: 90,
  сто: 100,
  двести: 200,
  триста: 300,
  четыреста: 400,
  пятьсот: 500,
  шестьсот: 600,
  семьсот: 700,
  восемьсот: 800,
  девятьсот: 900,
  тысяча: 1000,
};

type UnitToken = { unit: Unit; multiplier: number };

const UNITS: Record<string, UnitToken> = {
  г: { unit: 'г', multiplier: 1 },
  гр: { unit: 'г', multiplier: 1 },
  грамм: { unit: 'г', multiplier: 1 },
  грамма: { unit: 'г', multiplier: 1 },
  граммов: { unit: 'г', multiplier: 1 },
  кг: { unit: 'г', multiplier: 1000 },
  кило: { unit: 'г', multiplier: 1000 },
  килограмм: { unit: 'г', multiplier: 1000 },
  килограмма: { unit: 'г', multiplier: 1000 },
  килограммов: { unit: 'г', multiplier: 1000 },
  мл: { unit: 'мл', multiplier: 1 },
  миллилитров: { unit: 'мл', multiplier: 1 },
  л: { unit: 'мл', multiplier: 1000 },
  литр: { unit: 'мл', multiplier: 1000 },
  литра: { unit: 'мл', multiplier: 1000 },
  литров: { unit: 'мл', multiplier: 1000 },
  шт: { unit: 'шт', multiplier: 1 },
  штук: { unit: 'шт', multiplier: 1 },
  штука: { unit: 'шт', multiplier: 1 },
  штуки: { unit: 'шт', multiplier: 1 },
  штуку: { unit: 'шт', multiplier: 1 },
  зубчик: { unit: 'шт', multiplier: 1 },
  зубчика: { unit: 'шт', multiplier: 1 },
  зубчиков: { unit: 'шт', multiplier: 1 },
  головка: { unit: 'шт', multiplier: 1 },
  кочан: { unit: 'шт', multiplier: 1 },
  // «Три палки колбасы»: без этих слов колбаса ушла бы в граммы по умолчанию.
  палка: { unit: 'шт', multiplier: 1 },
  палки: { unit: 'шт', multiplier: 1 },
  палку: { unit: 'шт', multiplier: 1 },
  палок: { unit: 'шт', multiplier: 1 },
  кусок: { unit: 'шт', multiplier: 1 },
  куска: { unit: 'шт', multiplier: 1 },
  кусков: { unit: 'шт', multiplier: 1 },
  уп: { unit: 'уп', multiplier: 1 },
  упаковка: { unit: 'уп', multiplier: 1 },
  упаковки: { unit: 'уп', multiplier: 1 },
  упаковку: { unit: 'уп', multiplier: 1 },
  пачка: { unit: 'уп', multiplier: 1 },
  пачки: { unit: 'уп', multiplier: 1 },
  пачку: { unit: 'уп', multiplier: 1 },
  банка: { unit: 'уп', multiplier: 1 },
  банки: { unit: 'уп', multiplier: 1 },
  банку: { unit: 'уп', multiplier: 1 },
  бутылка: { unit: 'уп', multiplier: 1 },
  бутылки: { unit: 'уп', multiplier: 1 },
  бутылку: { unit: 'уп', multiplier: 1 },
  пучок: { unit: 'уп', multiplier: 1 },
  пучка: { unit: 'уп', multiplier: 1 },
};

/** Служебные слова: не ингредиент и не количество, просто пропускаем. */
const FILLERS = new Set([
  'и',
  'а',
  'да',
  'ну',
  'вот',
  'там',
  'еще',
  'плюс',
  'также',
  'тоже',
  'из',
  'с',
  'со',
  'в',
  'на',
  'у',
  'меня',
  'немного',
  'чуть',
  'есть',
  'лежит',
  'лежат',
  'осталось',
  'остались',
  'остался',
  'купил',
  'купила',
  'взял',
  'взяла',
  'положил',
  'положила',
  'добавь',
  'добавить',
  'запиши',
]);

type Pending = {
  quantity: number | null;
  unit: Unit | null;
};

const EMPTY_PENDING: Pending = { quantity: null, unit: null };

/**
 * Разбирает транскрипт речи в список продуктов.
 *
 * Android в режиме `free_form` часто возвращает текст без запятых, поэтому
 * разделители ненадёжны. Вместо разбиения по ним идём сканером слева направо
 * и на каждом шаге пробуем самое длинное совпадение со справочником —
 * так «куриное филе» не распадается на «курицу» и мусорное «филе».
 */
export function parseSpeech(transcript: string): ParseResult {
  const tokens = tokenize(transcript);
  const items: ParsedItem[] = [];
  const unrecognized: string[] = [];

  let pending: Pending = { ...EMPTY_PENDING };
  let unknownRun: string[] = [];

  const flushUnknown = () => {
    if (unknownRun.length > 0) {
      unrecognized.push(unknownRun.join(' '));
      unknownRun = [];
    }
  };

  let index = 0;
  while (index < tokens.length) {
    const maxWindow = Math.min(MAX_PHRASE_WORDS, tokens.length - index);
    let matchedLength = 0;

    for (let window = maxWindow; window >= 1; window -= 1) {
      const ingredientId = lookupPhrase(tokens.slice(index, index + window));
      if (ingredientId) {
        items.push(buildItem(ingredientId, pending));
        pending = { ...EMPTY_PENDING };
        // Неопознанные слова прямо перед ингредиентом — это прилагательные
        // («свежее молоко»), а не потерянный продукт: отбрасываем их.
        unknownRun = [];
        matchedLength = window;
        break;
      }
    }

    if (matchedLength > 0) {
      index += matchedLength;
      continue;
    }

    const token = tokens[index];
    index += 1;

    if (/^\d+$/.test(token)) {
      flushUnknown();
      pending.quantity = applyNumeral(pending.quantity, Number(token));
      continue;
    }

    const numeral = NUMERALS[token];
    if (numeral !== undefined) {
      flushUnknown();
      pending.quantity = applyNumeral(pending.quantity, numeral);
      continue;
    }

    const unitToken = UNITS[token];
    if (unitToken) {
      flushUnknown();
      pending.unit = unitToken.unit;
      pending.quantity = (pending.quantity ?? 1) * unitToken.multiplier;
      continue;
    }

    if (FILLERS.has(token)) {
      flushUnknown();
      continue;
    }

    unknownRun.push(token);
  }

  flushUnknown();

  return { items: mergeDuplicates(items), unrecognized };
}

/** «двести пятьдесят» → 250: меньшее число после большего складывается. */
function applyNumeral(current: number | null, value: number): number {
  if (current === null) {
    return value;
  }
  return value < current ? current + value : value;
}

function buildItem(ingredientId: string, pending: Pending): ParsedItem {
  if (pending.quantity === null) {
    return { ingredientId, quantity: null, unit: null };
  }
  const unit = pending.unit ?? getIngredient(ingredientId)?.defaultUnit ?? null;
  return { ingredientId, quantity: pending.quantity, unit };
}

/**
 * Один и тот же продукт, названный дважды, складываем в одну позицию.
 *
 * Экспортируется, потому что этим же нужно склеивать результаты нескольких
 * подходов к микрофону: продиктовал, вспомнил ещё продукт, продиктовал снова.
 */
export function mergeDuplicates(items: ParsedItem[]): ParsedItem[] {
  const merged: ParsedItem[] = [];

  for (const item of items) {
    const existing = merged.find((candidate) => candidate.ingredientId === item.ingredientId);
    if (!existing) {
      merged.push({ ...item });
      continue;
    }
    if (existing.quantity === null) {
      existing.quantity = item.quantity;
      existing.unit = item.unit;
    } else if (item.quantity !== null && existing.unit === item.unit) {
      existing.quantity += item.quantity;
    }
  }

  return merged;
}
