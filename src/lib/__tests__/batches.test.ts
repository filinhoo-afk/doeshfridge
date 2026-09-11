import {
  addBatch,
  consume,
  dropExpired,
  mergeSameExpiry,
  nearestDated,
  setExpiry,
  setQuantity,
  sortByExpiry,
  totalQuantity,
  type Batch,
} from '../batches';

/** Срок через `days` дней, на полдень по местному времени — как его ставит приложение. */
function inDays(days: number): string {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + days, 12).toISOString();
}

function batch(id: string, quantity: number | null, expiresAt: string | null): Batch {
  return { id, quantity, expiresAt };
}

let counter = 0;
const createId = () => `new-${(counter += 1)}`;

/** Партии в виде «количество@дней», чтобы ожидания читались как сценарий. */
function shape(batches: Batch[]): string[] {
  return sortByExpiry(batches).map((item) => {
    const days =
      item.expiresAt === null
        ? 'без срока'
        : `${Math.round((new Date(item.expiresAt).getTime() - new Date(inDays(0)).getTime()) / 86_400_000)}д`;
    return `${item.quantity}@${days}`;
  });
}

describe('sortByExpiry', () => {
  it('ставит ближайший срок первым, бессрочное — в конец', () => {
    const sorted = sortByExpiry([
      batch('a', 1, null),
      batch('b', 1, inDays(30)),
      batch('c', 1, inDays(1)),
    ]);

    expect(sorted.map((item) => item.id)).toEqual(['c', 'b', 'a']);
  });
});

describe('totalQuantity и nearestDated', () => {
  it('складывает известные количества и находит ближайшую партию со сроком', () => {
    const batches = [batch('a', 2, null), batch('b', 1, inDays(15)), batch('c', 1, inDays(1))];

    expect(totalQuantity(batches)).toBe(4);
    expect(nearestDated(batches)?.id).toBe('c');
  });

  it('возвращает null, когда ни количества, ни сроков нет', () => {
    const batches = [batch('a', null, null)];

    expect(totalQuantity(batches)).toBeNull();
    expect(nearestDated(batches)).toBeNull();
  });
});

describe('setExpiry — сценарий с тремя палками колбасы', () => {
  it('раскладывает одну партию на три с разными сроками', () => {
    let batches = [batch('all', 3, null)];

    // Одна истекает завтра — отделяем одну штуку.
    batches = setExpiry(batches, 'all', inDays(1), 1, createId);
    expect(shape(batches)).toEqual(['1@1д', '2@без срока']);

    // Вторая — через 15 дней.
    batches = setExpiry(batches, 'all', inDays(15), 1, createId);
    expect(shape(batches)).toEqual(['1@1д', '1@15д', '1@без срока']);

    // Последней — месяц, на всю оставшуюся партию.
    batches = setExpiry(batches, 'all', inDays(30), null, createId);
    expect(shape(batches)).toEqual(['1@1д', '1@15д', '1@30д']);
  });

  it('ставит срок на всю партию, если количество не меньше партии', () => {
    const batches = setExpiry([batch('all', 3, null)], 'all', inDays(5), 3, createId);

    expect(shape(batches)).toEqual(['3@5д']);
  });

  it('сливает отделённую часть с партией, у которой тот же срок', () => {
    const batches = setExpiry(
      [batch('dated', 1, inDays(7)), batch('rest', 2, null)],
      'rest',
      inDays(7),
      1,
      createId,
    );

    expect(shape(batches)).toEqual(['2@7д', '1@без срока']);
  });

  it('снимает срок, возвращая партию в бессрочные', () => {
    const batches = setExpiry(
      [batch('dated', 1, inDays(3)), batch('rest', 2, null)],
      'dated',
      null,
      null,
      createId,
    );

    expect(shape(batches)).toEqual(['3@без срока']);
  });

  it('не делит продукт без указанного количества', () => {
    const batches = setExpiry([batch('milk', null, null)], 'milk', inDays(2), 1, createId);

    expect(shape(batches)).toEqual(['null@2д']);
  });
});

describe('consume — сначала съедается то, что испортится раньше', () => {
  it('берёт из ближайшей партии и переходит к следующей', () => {
    const batches = [batch('a', 1, inDays(1)), batch('b', 1, inDays(15)), batch('c', 1, inDays(30))];

    expect(shape(consume(batches, 1))).toEqual(['1@15д', '1@30д']);
    expect(shape(consume(batches, 2))).toEqual(['1@30д']);
  });

  it('оставляет остаток, если партии хватило с запасом', () => {
    expect(shape(consume([batch('a', 5, null)], 2))).toEqual(['3@без срока']);
  });

  it('убирает только ближайшую партию, когда посчитать нельзя', () => {
    // Рецепт меряет колбасу в граммах, а в холодильнике она в штуках.
    const batches = [batch('a', 1, inDays(1)), batch('b', 2, null)];

    expect(shape(consume(batches, null))).toEqual(['2@без срока']);
  });

  it('не оставляет плавающих хвостов', () => {
    expect(consume([batch('a', 0.3, null)], 0.1)[0].quantity).toBe(0.2);
  });
});

describe('setQuantity, addBatch, mergeSameExpiry', () => {
  it('удаляет партию, когда количество дошло до нуля', () => {
    expect(setQuantity([batch('a', 1, null), batch('b', 2, inDays(1))], 'a', 0)).toHaveLength(1);
  });

  it('прибавляет новую партию к существующей с тем же сроком', () => {
    const batches = addBatch([batch('a', 2, inDays(4))], batch('b', 3, inDays(4)));

    expect(shape(batches)).toEqual(['5@4д']);
  });

  it('поглощает неизвестное количество известным', () => {
    expect(mergeSameExpiry([batch('a', null, null), batch('b', 500, null)])).toEqual([
      batch('a', 500, null),
    ]);
  });
});

describe('dropExpired', () => {
  it('убирает только партии с вышедшим сроком — сегодняшние ещё годны', () => {
    const batches = [
      batch('old', 1, inDays(-1)),
      batch('today', 1, inDays(0)),
      batch('fresh', 1, inDays(3)),
      batch('undated', 2, null),
    ];

    expect(dropExpired(batches).map((item) => item.id)).toEqual(['today', 'fresh', 'undated']);
  });
});
