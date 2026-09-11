/**
 * Шаг 2: скачивание выбранных фото. Для каждого рецепта с полем "file" в
 * sources.json берёт снимок с Commons, кадрирует в 4:3, сжимает в WebP
 * 480×360 без метаданных и кладёт в assets/recipes/<id>.webp. Автор и лицензия
 * сохраняются в sources.json, а из него генерируется src/data/recipe-photos.ts.
 *
 * Свои фото: положите исходник в scripts/photos/own/<id>.jpg (папка не в git),
 * скрипт сожмёт его так же и удалит EXIF — вместе с GPS-координатами.
 *
 *   node scripts/photos/fetch.mjs           только новые
 *   node scripts/photos/fetch.mjs --force   пересобрать все
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

import { fileInfo, politeFetch } from './commons.mjs';

const ROOT = path.resolve(import.meta.dirname, '../..');
const SOURCES = path.join(import.meta.dirname, 'sources.json');
const OWN = path.join(import.meta.dirname, 'own');
const ASSETS = path.join(ROOT, 'assets', 'recipes');
const GENERATED = path.join(ROOT, 'src', 'data', 'recipe-photos.ts');

const WIDTH = 480;
const HEIGHT = 360;
const QUALITY = 70;

const force = process.argv.includes('--force');
const sources = JSON.parse(fs.readFileSync(SOURCES, 'utf8'));
fs.mkdirSync(ASSETS, { recursive: true });

/** Кадрирование: по умолчанию sharp сам ищет самую «интересную» область. */
function position(entry) {
  return entry.crop ?? sharp.strategy.attention;
}

async function toWebp(input, entry, target) {
  await sharp(input)
    .rotate()
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: position(entry) })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(target);
}

const ownFiles = fs.existsSync(OWN) ? fs.readdirSync(OWN) : [];

for (const [id, entry] of Object.entries(sources)) {
  const target = path.join(ASSETS, `${id}.webp`);
  const own = ownFiles.find((name) => path.parse(name).name === id);

  if (own) {
    if (force || !fs.existsSync(target) || !entry.own) {
      await toWebp(path.join(OWN, own), entry, target);
      console.log(`${id}: своё фото`);
    }
    for (const key of ['file', 'author', 'license', 'licenseUrl', 'page']) delete entry[key];
    entry.own = true;
    continue;
  }

  if (!entry.file) continue;
  if (!force && fs.existsSync(target) && entry.author) continue;

  const info = await fileInfo(entry.file);
  if (!info) {
    console.warn(`${id}: файл ${entry.file} не найден или не подходит по лицензии`);
    continue;
  }
  const buffer = await politeFetch(info.thumb, { minInterval: 300, binary: true });
  await toWebp(buffer, entry, target);
  Object.assign(entry, {
    author: info.author,
    license: info.license,
    licenseUrl: info.licenseUrl,
    page: info.page,
  });
  delete entry.own;
  console.log(`${id}: ${info.license}, ${info.author}, ${fs.statSync(target).size} байт`);
}

fs.writeFileSync(SOURCES, JSON.stringify(sources, null, 2) + '\n');

// Удаляем webp, которые больше ни к чему не привязаны.
for (const name of fs.readdirSync(ASSETS)) {
  const id = path.parse(name).name;
  const entry = sources[id];
  if (!entry || !(entry.own || entry.author)) {
    fs.rmSync(path.join(ASSETS, name));
    console.log(`удалён лишний ${name}`);
  }
}

const quote = (text) => JSON.stringify(text ?? '');
const lines = Object.entries(sources)
  .filter(([id, entry]) => (entry.own || entry.author) && fs.existsSync(path.join(ASSETS, `${id}.webp`)))
  .map(([id, entry]) => {
    const source = `require('../../assets/recipes/${id}.webp')`;
    if (entry.own) return `  ${id}: { source: ${source} },`;
    return (
      `  ${id}: {\n    source: ${source},\n    credit: {\n` +
      `      author: ${quote(entry.author)},\n      license: ${quote(entry.license)},\n` +
      `      licenseUrl: ${quote(entry.licenseUrl)},\n      page: ${quote(entry.page)},\n    },\n  },`
    );
  });

fs.writeFileSync(
  GENERATED,
  `// Сгенерировано scripts/photos/fetch.mjs — не правьте вручную.
import type { ImageSourcePropType } from 'react-native';

export type PhotoCredit = {
  author: string;
  license: string;
  licenseUrl: string;
  /** Страница файла на Wikimedia Commons. */
  page: string;
};

export type RecipePhoto = {
  source: ImageSourcePropType;
  /** Нет у собственных фото автора приложения. */
  credit?: PhotoCredit;
};

export const RECIPE_PHOTOS: Readonly<Record<string, RecipePhoto>> = {
${lines.join('\n')}
};
`,
);

const total = fs.readdirSync(ASSETS).reduce((sum, name) => sum + fs.statSync(path.join(ASSETS, name)).size, 0);
console.log(`фото: ${lines.length}, всего ${(total / 1024).toFixed(0)} КБ`);
