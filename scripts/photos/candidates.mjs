/**
 * Шаг 1: подбор кандидатов. Для рецептов без выбранного фото ищет файлы на
 * Wikimedia Commons и собирает листы превью в .photo-review/ (не в git).
 * По листам вручную выбирается номер снимка, и в sources.json у рецепта
 * появляется поле "file".
 *
 *   node scripts/photos/candidates.mjs            все рецепты без фото
 *   node scripts/photos/candidates.mjs borsch uha только перечисленные
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

import { politeFetch, searchFiles } from './commons.mjs';

const ROOT = path.resolve(import.meta.dirname, '../..');
const SOURCES = path.join(import.meta.dirname, 'sources.json');
const OUT = path.join(ROOT, '.photo-review');

const PER_RECIPE = 6;
const ROWS_PER_SHEET = 8;
const THUMB_W = 240;
const THUMB_H = 180;
const LABEL_W = 230;
const GAP = 6;

const escapeXml = (text) =>
  String(text).replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]);

const sources = JSON.parse(fs.readFileSync(SOURCES, 'utf8'));
const only = process.argv.slice(2);
// Рецепты, у которых фото уже выбрано или отмечено «нет подходящего» (none), пропускаем.
const ids = Object.keys(sources).filter((id) =>
  only.length ? only.includes(id) : !sources[id].file && !sources[id].none && !sources[id].own,
);

fs.mkdirSync(OUT, { recursive: true });
const CACHE = path.join(OUT, 'candidates.json');

// Кэш найденного: при обрыве сети повторный запуск продолжает с того же места.
// Явно перечисленные рецепты ищутся заново.
const all = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};

for (const id of ids) {
  if (all[id] && !only.includes(id)) continue;
  const found = [];
  for (const query of sources[id].queries) {
    for (const candidate of await searchFiles(query)) {
      if (!found.some((item) => item.file === candidate.file)) found.push(candidate);
    }
    if (found.length >= PER_RECIPE) break;
  }
  all[id] = found.slice(0, PER_RECIPE);
  fs.writeFileSync(CACHE, JSON.stringify(all, null, 1));
  console.log(`${id}: ${all[id].length}`);
}

async function tile(candidate, index) {
  let image;
  try {
    const buffer = await politeFetch(candidate.thumb, { minInterval: 250, binary: true });
    image = await sharp(buffer).resize(THUMB_W, THUMB_H, { fit: 'cover' }).toBuffer();
  } catch {
    image = await sharp({ create: { width: THUMB_W, height: THUMB_H, channels: 3, background: '#555' } })
      .png()
      .toBuffer();
  }
  const overlay = Buffer.from(
    `<svg width="${THUMB_W}" height="${THUMB_H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="34" height="30" fill="#000" opacity="0.75"/>
      <text x="17" y="22" font-size="20" font-family="Arial" font-weight="bold" fill="#fff" text-anchor="middle">${index + 1}</text>
      <rect y="${THUMB_H - 20}" width="${THUMB_W}" height="20" fill="#000" opacity="0.6"/>
      <text x="4" y="${THUMB_H - 5}" font-size="12" font-family="Arial" fill="#fff">${escapeXml(candidate.license)} · ${candidate.width}×${candidate.height}</text>
    </svg>`,
  );
  return sharp(image).composite([{ input: overlay }]).toBuffer();
}

const withCandidates = ids.filter((id) => all[id].length > 0);
const missing = ids.filter((id) => all[id].length === 0);

for (let sheet = 0; sheet * ROWS_PER_SHEET < withCandidates.length; sheet++) {
  const rows = withCandidates.slice(sheet * ROWS_PER_SHEET, (sheet + 1) * ROWS_PER_SHEET);
  const width = LABEL_W + PER_RECIPE * (THUMB_W + GAP);
  const height = rows.length * (THUMB_H + GAP);
  const layers = [];

  for (const [row, id] of rows.entries()) {
    const top = row * (THUMB_H + GAP);
    layers.push({
      input: Buffer.from(
        `<svg width="${LABEL_W}" height="${THUMB_H}" xmlns="http://www.w3.org/2000/svg">
          <text x="8" y="40" font-size="18" font-family="Arial" font-weight="bold" fill="#fff">${escapeXml(id)}</text>
          <text x="8" y="70" font-size="15" font-family="Arial" fill="#ccc">${escapeXml(sources[id].title ?? '')}</text>
        </svg>`,
      ),
      left: 0,
      top,
    });
    for (const [index, candidate] of all[id].entries()) {
      layers.push({ input: await tile(candidate, index), left: LABEL_W + index * (THUMB_W + GAP), top });
    }
  }

  const file = path.join(OUT, `sheet-${String(sheet + 1).padStart(2, '0')}.jpg`);
  await sharp({ create: { width, height, channels: 3, background: '#222' } })
    .composite(layers)
    .jpeg({ quality: 80 })
    .toFile(file);
  console.log(`лист ${file}: ${rows.join(', ')}`);
}

if (missing.length) console.log(`без кандидатов: ${missing.join(', ')}`);
