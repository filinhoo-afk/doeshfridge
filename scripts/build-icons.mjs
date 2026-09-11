/**
 * Собирает все иконки приложения из SVG-исходников в assets/icon-src/.
 *
 * Исходники — единственный источник правды: PNG в assets/images/ генерируются
 * этим скриптом и руками не правятся. После изменения SVG:
 *
 *   node scripts/build-icons.mjs
 *
 * Исходники рисуются в координатах 0..128 на прозрачном фоне:
 *   glyph.svg       — знак в цвете;
 *   glyph-mono.svg  — силуэт знака для тематических иконок Android 13+.
 *                     Лаунчер берёт только альфа-канал и красит его сам,
 *                     поэтому детали, различимые лишь цветом, там пропадают.
 */
import resvg from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { Resvg } = resvg;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Фирменный оранжевый — тот же, что `accent` в src/constants/theme.ts. */
const BRAND = '#E8590C';

/**
 * Адаптивная иконка Android: холст 108 dp, из них лаунчер показывает только
 * центральные 72 dp, а гарантированно — лишь круг диаметром 66 dp.
 *
 * Знак ужимается в той же пропорции 72/108, в какой видимая часть меньше
 * холста. Тогда на рабочем столе он занимает ту же долю, что и в icon.png,
 * а кончики ножек — самая удалённая от центра точка — остаются в пределах
 * 28 dp из допустимых 33.
 */
const ADAPTIVE_SCALE = 72 / 108;

function readSource(name) {
  const svg = readFileSync(path.join(root, 'assets/icon-src', name), 'utf8');
  // Нужно только содержимое: оно встраивается в сцену с фоном и масштабом.
  return svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
}

function scene({ content, background, scale = 1 }) {
  const offset = (128 * (1 - scale)) / 2;
  const fill = background ? `<rect width="128" height="128" fill="${background}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">${fill}<g transform="translate(${offset} ${offset}) scale(${scale})">${content}</g></svg>`;
}

function render(file, size, svg) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
  writeFileSync(path.join(root, 'assets/images', file), png);
  console.log(`${file.padEnd(30)} ${size}×${size}`);
}

const glyph = readSource('glyph.svg');
const mono = readSource('glyph-mono.svg');

// Полная иконка — квадрат без скруглений: форму задаёт маска системы.
render('icon.png', 1024, scene({ content: glyph, background: BRAND }));
render('favicon.png', 48, scene({ content: glyph, background: BRAND }));

// Слои адаптивной иконки Android.
render('android-icon-background.png', 1024, scene({ content: '', background: BRAND }));
render('android-icon-foreground.png', 1024, scene({ content: glyph, scale: ADAPTIVE_SCALE }));
render('android-icon-monochrome.png', 1024, scene({ content: mono, scale: ADAPTIVE_SCALE }));

// Заставка: знак на прозрачном фоне, цвет фона задаётся в app.json.
render('splash-icon.png', 1024, scene({ content: glyph }));
