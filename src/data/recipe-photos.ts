// Сгенерировано scripts/photos/fetch.mjs — не правьте вручную.
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
};
