/**
 * Список рецептов для генерации фотографий в стороннем сервисе.
 *
 * Собирает .photo-review/prompts.tsv: идентификатор, название, есть ли фото
 * сейчас и готовый промпт. Хвост промпта у всех блюд одинаковый — в этом весь
 * смысл: единый ракурс, фон и свет дают набор, который не выглядит солянкой.
 *
 *   node scripts/photos/prompts.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '../..');
const RECIPES_DIR = path.join(ROOT, 'src/data/recipes');
const INGREDIENTS = path.join(ROOT, 'src/data/ingredients.ts');
const ASSETS = path.join(ROOT, 'assets/recipes');
const OUT_DIR = path.join(ROOT, '.photo-review');
const OUT = path.join(OUT_DIR, 'prompts.tsv');

/** Общий хвост промпта. Меняется только вместе со всеми 500 картинками. */
const STYLE =
  'photorealistic food photography, top-down 45 degree angle, single dish centered ' +
  'on a dark wooden table, soft natural daylight from the left, shallow depth of field, ' +
  'no hands, no text, no logos, no extra props, 4:3 aspect ratio';

/** В какой посуде подавать: по тегу блюда. */
const VESSELS = [
  ['суп', 'a deep ceramic bowl of'],
  ['салат', 'a shallow ceramic bowl of'],
  ['закуска', 'a small ceramic plate of'],
  ['выпечка', 'a ceramic plate of'],
];
const DEFAULT_VESSEL = 'a ceramic plate of';

/** Сколько продуктов перечислять в промпте. Больше — генератор начинает путаться. */
const MAX_INGREDIENTS = 6;

/** Базовые продукты не видно в кадре: соль и вода не влияют на картинку. */
function pantryIds() {
  const source = fs.readFileSync(INGREDIENTS, 'utf8');
  const ids = new Set();
  for (const line of source.split('\n')) {
    const id = line.match(/id: '([^']+)'/)?.[1];
    if (id && line.includes('pantry: true')) {
      ids.add(id);
    }
  }
  return ids;
}

/**
 * Массив рецептов из файла категории. Единственная типизация в этих файлах —
 * аннотация у export, поэтому достаточно срезать её и импортировать как JS.
 */
async function readRecipes(file) {
  const source = fs.readFileSync(file, 'utf8');
  const js = source
    .replace(/^import[^;]+;$/gm, '')
    .replace(/export const \w+: Recipe\[\] =/, 'export default');
  const temp = path.join(OUT_DIR, `.${path.basename(file, '.ts')}.mjs`);
  fs.writeFileSync(temp, js);
  try {
    return (await import(pathToFileURL(temp).href)).default;
  } finally {
    fs.rmSync(temp, { force: true });
  }
}

function vesselFor(tags) {
  return VESSELS.find(([tag]) => tags.includes(tag))?.[1] ?? DEFAULT_VESSEL;
}

/** id продукта уже по-английски: 'sour_cream' → 'sour cream'. */
function visibleIngredients(recipe, pantry) {
  return recipe.ingredients
    .filter((item) => !item.optional && !pantry.has(item.ingredientId))
    .slice(0, MAX_INGREDIENTS)
    .map((item) => item.ingredientId.replace(/_/g, ' '))
    .join(', ');
}

const pantry = pantryIds();
fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs
  .readdirSync(RECIPES_DIR)
  .filter((name) => name.endsWith('.ts') && name !== 'index.ts' && name !== 'types.ts')
  .sort();

const rows = [];
for (const name of files) {
  for (const recipe of await readRecipes(path.join(RECIPES_DIR, name))) {
    // Латиницей — сам id: генераторы понимают «borsch» увереннее, чем «Борщ».
    const latin = recipe.id.replace(/_/g, ' ');
    const prompt = `${vesselFor(recipe.tags)} ${latin} (${recipe.title}): ${visibleIngredients(recipe, pantry)}. ${STYLE}`;
    const has = fs.existsSync(path.join(ASSETS, `${recipe.id}.webp`)) ? 'есть' : 'нет';
    rows.push([recipe.id, recipe.title, has, prompt].join('\t'));
  }
}

rows.sort((a, b) => a.localeCompare(b, 'ru'));
fs.writeFileSync(OUT, ['id\tназвание\tфото сейчас\tпромпт', ...rows].join('\n') + '\n');

const missing = rows.filter((row) => row.split('\t')[2] === 'нет').length;
console.log(`${OUT}: ${rows.length} рецептов, из них без фото сейчас ${missing}.`);
console.log(`Файлы называйте по id: borsch.png, syrniki.png — дальше их подхватит fetch.mjs.`);
