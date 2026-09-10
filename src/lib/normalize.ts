/**
 * Нормализация русского текста для сопоставления со справочником ингредиентов.
 *
 * Основной механизм распознавания — явные словоформы в справочнике
 * (см. `src/data/ingredients.ts`). Стеммер здесь — только подстраховка для форм,
 * которых в справочнике нет: беглые гласные в русском его ломают
 * («яйца» → «яйц», но «яиц» → «яиц»), поэтому полагаться на него нельзя.
 */

/** Окончания отсекаем от длинных к коротким, иначе «ами» никогда не сработает. */
const NOUN_SUFFIXES = [
  'иями',
  'ами',
  'ями',
  'ов',
  'ев',
  'ей',
  'ам',
  'ям',
  'ах',
  'ях',
  'ою',
  'ой',
  'ы',
  'и',
  'а',
  'я',
  'у',
  'ю',
  'е',
  'ь',
  'о',
];

/** Минимальная длина остатка после отсечения окончания. */
const MIN_STEM_LENGTH = 3;

/**
 * Нижний регистр, ё → е, дефисы и пунктуация → пробелы, схлопывание пробелов.
 * Дефис становится пробелом намеренно: «пол-литра» должно разбиться на два
 * токена, чтобы разбор количества сработал.
 */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^а-яa-z0-9]+/g, ' ')
    .trim();
}

export function tokenize(input: string): string[] {
  const normalized = normalize(input);
  return normalized.length ? normalized.split(' ') : [];
}

/** Грубое отсечение именных окончаний. Применять к обеим сторонам сравнения. */
export function stem(word: string): string {
  if (word.length <= MIN_STEM_LENGTH) {
    return word;
  }
  for (const suffix of NOUN_SUFFIXES) {
    if (word.endsWith(suffix) && word.length - suffix.length >= MIN_STEM_LENGTH) {
      return word.slice(0, word.length - suffix.length);
    }
  }
  return word;
}
