/**
 * Записывает выбор с листов превью в sources.json.
 *
 *   node scripts/photos/pick.mjs omlet=2 syrniki=1   номер снимка на листе
 *   node scripts/photos/pick.mjs borsch=-            у рецепта нет подходящего фото
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const SOURCES = path.join(import.meta.dirname, 'sources.json');
const CANDIDATES = path.join(ROOT, '.photo-review', 'candidates.json');

const sources = JSON.parse(fs.readFileSync(SOURCES, 'utf8'));
const candidates = JSON.parse(fs.readFileSync(CANDIDATES, 'utf8'));

for (const arg of process.argv.slice(2)) {
  const [id, choice] = arg.split('=');
  if (!sources[id]) throw new Error(`нет рецепта ${id} в sources.json`);

  if (choice === '-') {
    delete sources[id].file;
    sources[id].none = true;
    console.log(`${id}: без фото`);
    continue;
  }

  const candidate = candidates[id]?.[Number(choice) - 1];
  if (!candidate) throw new Error(`у ${id} нет кандидата №${choice}`);
  if (sources[id].file !== candidate.file) {
    // Новый выбор: старые автор и лицензия больше не относятся к фото.
    for (const key of ['author', 'license', 'licenseUrl', 'page', 'none']) delete sources[id][key];
  }
  sources[id].file = candidate.file;
  console.log(`${id}: ${candidate.file} (${candidate.license})`);
}

fs.writeFileSync(SOURCES, JSON.stringify(sources, null, 2) + '\n');
