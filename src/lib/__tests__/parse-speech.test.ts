import { mergeDuplicates, parseSpeech } from '../parse-speech';

describe('parseSpeech', () => {
  it('разбирает перечисление через запятые и союз', () => {
    const result = parseSpeech('молоко, три яйца, помидоры и куриное филе');

    expect(result.items).toEqual([
      { ingredientId: 'milk', quantity: null, unit: null },
      { ingredientId: 'egg', quantity: 3, unit: 'шт' },
      { ingredientId: 'tomato', quantity: null, unit: null },
      { ingredientId: 'chicken_fillet', quantity: null, unit: null },
    ]);
    expect(result.unrecognized).toEqual([]);
  });

  it('даёт тот же результат без знаков препинания — так отвечает Android', () => {
    const withPunctuation = parseSpeech('молоко, три яйца, помидоры и куриное филе');
    const withoutPunctuation = parseSpeech('молоко три яйца помидоры и куриное филе');

    expect(withoutPunctuation).toEqual(withPunctuation);
  });

  it('не разваливает многословный ингредиент на части', () => {
    expect(parseSpeech('куриное филе').items).toEqual([
      { ingredientId: 'chicken_fillet', quantity: null, unit: null },
    ]);
    // «масло» отдельно — растительное, «сливочное масло» — другой продукт.
    expect(parseSpeech('сливочное масло').items).toEqual([
      { ingredientId: 'butter', quantity: null, unit: null },
    ]);
    expect(parseSpeech('масло').items).toEqual([
      { ingredientId: 'oil', quantity: null, unit: null },
    ]);
    // «перец» — специя, «болгарский перец» — овощ.
    expect(parseSpeech('болгарский перец').items).toEqual([
      { ingredientId: 'bell_pepper', quantity: null, unit: null },
    ]);
    expect(parseSpeech('перец').items).toEqual([
      { ingredientId: 'black_pepper', quantity: null, unit: null },
    ]);
  });

  it('понимает граммы, килограммы и литры', () => {
    expect(parseSpeech('двести грамм сыра').items).toEqual([
      { ingredientId: 'cheese', quantity: 200, unit: 'г' },
    ]);
    expect(parseSpeech('килограмм картошки').items).toEqual([
      { ingredientId: 'potato', quantity: 1000, unit: 'г' },
    ]);
    expect(parseSpeech('пол-литра молока').items).toEqual([
      { ingredientId: 'milk', quantity: 500, unit: 'мл' },
    ]);
    expect(parseSpeech('два литра молока').items).toEqual([
      { ingredientId: 'milk', quantity: 2000, unit: 'мл' },
    ]);
  });

  it('складывает составные числительные', () => {
    expect(parseSpeech('двести пятьдесят грамм творога').items).toEqual([
      { ingredientId: 'cottage_cheese', quantity: 250, unit: 'г' },
    ]);
  });

  it('принимает цифры — распознаватель часто возвращает их вместо слов', () => {
    expect(parseSpeech('3 яйца и 500 г муки').items).toEqual([
      { ingredientId: 'egg', quantity: 3, unit: 'шт' },
      { ingredientId: 'flour', quantity: 500, unit: 'г' },
    ]);
  });

  it('возвращает нераспознанное отдельно, не теряя остальное', () => {
    const result = parseSpeech('килограмм картошки и абракадабра');

    expect(result.items).toEqual([{ ingredientId: 'potato', quantity: 1000, unit: 'г' }]);
    expect(result.unrecognized).toEqual(['абракадабра']);
  });

  it('игнорирует прилагательные перед известным продуктом', () => {
    const result = parseSpeech('свежее молоко');

    expect(result.items).toEqual([{ ingredientId: 'milk', quantity: null, unit: null }]);
    expect(result.unrecognized).toEqual([]);
  });

  it('пропускает разговорные вставки', () => {
    const result = parseSpeech('у меня есть немного сметаны и еще осталось два огурца');

    expect(result.items).toEqual([
      { ingredientId: 'sour_cream', quantity: null, unit: null },
      { ingredientId: 'cucumber', quantity: 2, unit: 'шт' },
    ]);
    expect(result.unrecognized).toEqual([]);
  });

  it('объединяет продукт, названный дважды', () => {
    expect(parseSpeech('два яйца и еще три яйца').items).toEqual([
      { ingredientId: 'egg', quantity: 5, unit: 'шт' },
    ]);
  });

  it('склеивает два подхода к микрофону, ничего не теряя', () => {
    // Продиктовал, увидел список, вспомнил ещё продукт, продиктовал снова.
    const first = parseSpeech('молоко и три яйца');
    const second = parseSpeech('помидоры');

    expect(mergeDuplicates([...first.items, ...second.items])).toEqual([
      { ingredientId: 'milk', quantity: null, unit: null },
      { ingredientId: 'egg', quantity: 3, unit: 'шт' },
      { ingredientId: 'tomato', quantity: null, unit: null },
    ]);
  });

  it('складывает количество, если продукт назван в обоих подходах', () => {
    const first = parseSpeech('два яйца');
    const second = parseSpeech('еще три яйца');

    expect(mergeDuplicates([...first.items, ...second.items])).toEqual([
      { ingredientId: 'egg', quantity: 5, unit: 'шт' },
    ]);
  });

  it('не падает на пустой строке', () => {
    expect(parseSpeech('')).toEqual({ items: [], unrecognized: [] });
    expect(parseSpeech('   ...   ')).toEqual({ items: [], unrecognized: [] });
  });

  it('распознаёт словоформы, которых нет в справочнике, через основу', () => {
    // «помидорах» не перечислено явно — срабатывает стеммер.
    expect(parseSpeech('в помидорах').items).toEqual([
      { ingredientId: 'tomato', quantity: null, unit: null },
    ]);
  });

  it('не различает ё и е', () => {
    expect(parseSpeech('свёкла').items).toEqual([
      { ingredientId: 'beet', quantity: null, unit: null },
    ]);
  });
});
