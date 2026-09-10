import { INGREDIENTS, type Ingredient } from '@/data/ingredients';

import { normalize, stem, tokenize } from './normalize';

/** Точное совпадение нормализованной фразы: «куриное филе» → chicken_fillet. */
const exactIndex = new Map<string, string>();
/** Совпадение по основам — подстраховка для форм, которых нет в справочнике. */
const stemIndex = new Map<string, string>();

let maxPhraseWords = 1;

for (const ingredient of INGREDIENTS) {
  for (const phrase of [ingredient.name, ...ingredient.forms]) {
    const words = tokenize(phrase);
    if (words.length === 0) {
      continue;
    }
    maxPhraseWords = Math.max(maxPhraseWords, words.length);

    const exactKey = words.join(' ');
    if (!exactIndex.has(exactKey)) {
      exactIndex.set(exactKey, ingredient.id);
    }

    const stemKey = words.map(stem).join(' ');
    if (!stemIndex.has(stemKey)) {
      stemIndex.set(stemKey, ingredient.id);
    }
  }
}

/** Максимальная длина фразы в справочнике — размер окна для сканера речи. */
export const MAX_PHRASE_WORDS = maxPhraseWords;

/** Ищет ингредиент по уже нормализованным словам. */
export function lookupPhrase(words: string[]): string | null {
  if (words.length === 0) {
    return null;
  }
  return (
    exactIndex.get(words.join(' ')) ?? stemIndex.get(words.map(stem).join(' ')) ?? null
  );
}

/** Поиск для ручного добавления: совпадение по началу названия или любой формы. */
export function searchIngredients(query: string, limit = 30): Ingredient[] {
  const normalized = normalize(query);
  if (normalized.length === 0) {
    return [];
  }

  const startsWith: Ingredient[] = [];
  const contains: Ingredient[] = [];

  for (const ingredient of INGREDIENTS) {
    const phrases = [ingredient.name, ...ingredient.forms].map(normalize);
    if (phrases.some((phrase) => phrase.startsWith(normalized))) {
      startsWith.push(ingredient);
    } else if (phrases.some((phrase) => phrase.includes(normalized))) {
      contains.push(ingredient);
    }
  }

  return [...startsWith, ...contains].slice(0, limit);
}

/**
 * Названия ингредиентов для `contextualStrings` распознавателя речи —
 * движок смещает гипотезы в их сторону, что заметно поднимает точность.
 */
export const RECOGNITION_HINTS: string[] = INGREDIENTS.filter(
  (ingredient) => !ingredient.pantry,
).map((ingredient) => ingredient.name);
