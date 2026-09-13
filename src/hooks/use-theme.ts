/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { CategoryColors, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

function useSchemeName(): 'light' | 'dark' {
  const scheme = useColorScheme();
  return scheme === 'dark' ? 'dark' : 'light';
}

export function useTheme() {
  return Colors[useSchemeName()];
}

/** Цвета категорий продуктов для текущей темы. */
export function useCategoryColors() {
  return CategoryColors[useSchemeName()];
}
