/**
 * Партии продукта: у каждой своё количество и свой срок годности.
 *
 * Три палки колбасы с разными датами — это одна строка «колбаса 3 шт»
 * в холодильнике и три партии внутри. Все функции здесь чистые: принимают
 * список партий и возвращают новый, ничего не меняя на месте.
 */

export type Batch = {
  id: string;
  /**
   * `null` — количество не указано («молоко» без объёма). У такого продукта
   * партия ровно одна: делить неизвестное количество не на что.
   */
  quantity: number | null;
  /** `null` — без срока. Так по умолчанию хранится всё. */
  expiresAt: string | null;
};

/** Остаток после вычитания без хвостов вида 0.30000000000000004. */
function subtract(a: number, b: number): number {
  return Math.round((a - b) * 1000) / 1000;
}

function sameDay(a: string | null, b: string | null): boolean {
  if (a === null || b === null) {
    return a === b;
  }
  const first = new Date(a);
  const second = new Date(b);
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

/** Сначала то, что испортится раньше, бессрочное — в конце. В этом же порядке идёт списание. */
export function sortByExpiry(batches: Batch[]): Batch[] {
  return [...batches].sort((a, b) => {
    if (a.expiresAt && b.expiresAt) {
      return a.expiresAt.localeCompare(b.expiresAt);
    }
    if (a.expiresAt) {
      return -1;
    }
    return b.expiresAt ? 1 : 0;
  });
}

/** Сумма известных количеств; `null`, если количество не указано ни у одной партии. */
export function totalQuantity(batches: Batch[]): number | null {
  const known = batches.filter((batch) => batch.quantity !== null);
  if (known.length === 0) {
    return null;
  }
  return known.reduce((sum, batch) => sum + (batch.quantity ?? 0), 0);
}

/** Ближайшая по сроку партия или `null`, если сроков нет ни у одной. */
export function nearestDated(batches: Batch[]): Batch | null {
  return sortByExpiry(batches).find((batch) => batch.expiresAt !== null) ?? null;
}

/**
 * Партии с одинаковым сроком склеиваются: две пачки «до 26 сентября» незачем
 * показывать раздельно. Неизвестное количество поглощается известным.
 */
export function mergeSameExpiry(batches: Batch[]): Batch[] {
  const merged: Batch[] = [];

  for (const batch of batches) {
    const twin = merged.find((candidate) => sameDay(candidate.expiresAt, batch.expiresAt));
    if (!twin) {
      merged.push({ ...batch });
      continue;
    }
    twin.quantity =
      twin.quantity === null || batch.quantity === null
        ? (twin.quantity ?? batch.quantity)
        : twin.quantity + batch.quantity;
  }

  return merged;
}

/**
 * Ставит срок на `count` единиц партии. Если это не вся партия, отделяет их
 * в новую, а остаток сохраняет прежний срок: из «3 шт без срока» получаются
 * «1 шт до завтра» и «2 шт без срока». `count === null` — вся партия целиком.
 */
export function setExpiry(
  batches: Batch[],
  batchId: string,
  expiresAt: string | null,
  count: number | null,
  createId: () => string,
): Batch[] {
  const next: Batch[] = [];

  for (const batch of batches) {
    if (batch.id !== batchId) {
      next.push(batch);
    } else if (count !== null && batch.quantity !== null && count < batch.quantity) {
      next.push({ ...batch, quantity: subtract(batch.quantity, count) });
      next.push({ id: createId(), quantity: count, expiresAt });
    } else {
      next.push({ ...batch, expiresAt });
    }
  }

  return mergeSameExpiry(next);
}

/** Докупили или нашли ещё: новая партия, при совпадении срока — прибавка к старой. */
export function addBatch(batches: Batch[], batch: Batch): Batch[] {
  return mergeSameExpiry([...batches, batch]);
}

/** Количество ноль и меньше означает, что партия съедена. */
export function setQuantity(batches: Batch[], batchId: string, quantity: number | null): Batch[] {
  return batches.flatMap((batch) => {
    if (batch.id !== batchId) {
      return [batch];
    }
    return quantity !== null && quantity <= 0 ? [] : [{ ...batch, quantity }];
  });
}

export function removeBatch(batches: Batch[], batchId: string): Batch[] {
  return batches.filter((batch) => batch.id !== batchId);
}

/**
 * Списывает `amount` по принципу «что испортится раньше — съедается первым».
 *
 * Если посчитать нельзя — количество не указано или рецепт меряет в других
 * единицах, — убирает одну ближайшую по сроку партию. Это честнее, чем гадать
 * с остатком, и мягче, чем стирать продукт целиком: три колбасы с разными
 * сроками не должны исчезнуть из-за одного оливье.
 */
export function consume(batches: Batch[], amount: number | null): Batch[] {
  const sorted = sortByExpiry(batches);

  if (amount === null || sorted.some((batch) => batch.quantity === null)) {
    return sorted.slice(1);
  }

  let left = amount;
  const rest: Batch[] = [];

  for (const batch of sorted) {
    const quantity = batch.quantity ?? 0;
    if (left <= 0) {
      rest.push(batch);
    } else if (quantity > left) {
      rest.push({ ...batch, quantity: subtract(quantity, left) });
      left = 0;
    } else {
      left = subtract(left, quantity);
    }
  }

  return rest;
}
