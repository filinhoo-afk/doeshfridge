/**
 * Общие функции для работы с Wikimedia Commons: запросы с паузами и повтором
 * при 429, отбор свободных лицензий, разбор автора.
 */

export const USER_AGENT = 'DoeshRecipePhotos/1.0 (student project; recipe photo fetcher)';

/** Лицензии, которые разрешают использовать фото в приложении с указанием автора. */
const ALLOWED_LICENSE = /^(CC0|Public domain|PD|CC BY(-SA)? \d(\.\d)?)/i;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let lastRequest = 0;

/** GET с минимальным интервалом между запросами и повтором при 429/5xx и обрывах сети. */
export async function politeFetch(url, { minInterval = 1500, binary = false } = {}) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    const wait = lastRequest + minInterval - Date.now();
    if (wait > 0) await sleep(wait);
    lastRequest = Date.now();

    let response;
    try {
      response = await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
        signal: AbortSignal.timeout(30_000),
      });
    } catch (error) {
      console.warn(`  сеть: ${error.cause?.code ?? error.name}, повтор через ${10 * attempt} с`);
      await sleep(10_000 * attempt);
      continue;
    }
    if (response.ok) {
      return binary ? Buffer.from(await response.arrayBuffer()) : response.json();
    }
    if (response.status === 429 || response.status >= 500) {
      const retryAfter = Number(response.headers.get('retry-after')) || 5 * attempt;
      console.warn(`  ${response.status}, жду ${retryAfter} с`);
      await sleep(retryAfter * 1000);
      continue;
    }
    throw new Error(`${response.status} ${url}`);
  }
  throw new Error(`не удалось получить ${url}`);
}

/** Имя автора из extmetadata: там HTML со ссылками — оставляем текст. */
export function plainArtist(html) {
  return String(html ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function isAllowedLicense(shortName) {
  return ALLOWED_LICENSE.test(String(shortName ?? '').trim());
}

/** Описание файла Commons в удобном виде или null, если он не подходит. */
export function describePage(page, { minWidth = 480 } = {}) {
  const info = page.imageinfo?.[0];
  if (!info) return null;
  if (!/^image\/(jpeg|png|webp)$/.test(info.mime)) return null;
  if (info.width < minWidth || info.height < minWidth * 0.6) return null;

  const meta = info.extmetadata ?? {};
  const license = meta.LicenseShortName?.value ?? '';
  if (!isAllowedLicense(license)) return null;

  return {
    file: page.title,
    width: info.width,
    height: info.height,
    thumb: info.thumburl,
    page: info.descriptionurl,
    license,
    licenseUrl: meta.LicenseUrl?.value ?? '',
    author: plainArtist(meta.Artist?.value) || 'неизвестен',
  };
}

const IMAGE_PROPS =
  'prop=imageinfo&iiprop=url|size|mime|extmetadata' +
  '&iiextmetadatafilter=LicenseShortName|LicenseUrl|Artist&format=json&formatversion=2';

/** Поиск файлов на Commons. */
export async function searchFiles(query, { limit = 12, thumbWidth = 320 } = {}) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&generator=search' +
    `&gsrsearch=${encodeURIComponent(`${query} filetype:bitmap`)}` +
    `&gsrnamespace=6&gsrlimit=${limit}&iiurlwidth=${thumbWidth}&${IMAGE_PROPS}`;
  const data = await politeFetch(url);
  const pages = data.query?.pages ?? [];
  return pages
    .sort((a, b) => a.index - b.index)
    .map((page) => describePage(page))
    .filter(Boolean);
}

/** Сведения о конкретном файле (с превью нужной ширины). */
export async function fileInfo(file, { thumbWidth = 960 } = {}) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query' +
    `&titles=${encodeURIComponent(file)}&iiurlwidth=${thumbWidth}&${IMAGE_PROPS}`;
  const data = await politeFetch(url);
  const page = data.query?.pages?.[0];
  return page ? describePage(page, { minWidth: 0 }) : null;
}
