/**
 * Палитра приложения. Оранжевый акцент в обеих темах, нейтральные цвета тёплые:
 * фото блюд сняты на тёмном дереве, и холодный серый рядом с ними выглядел чужим.
 *
 * Светлая тема — «кухонная»: кремовый фон и белые карточки.
 * Тёмная — «тёплый вечер»: кофейный фон и карточки цвета тёмного шоколада.
 */

import '@/global.css';

import { Platform } from 'react-native';

import type { Category } from '@/data/ingredients';

export const Colors = {
  light: {
    text: '#2A1D12',
    background: '#FFF6EC',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#F5EADF',
    textSecondary: '#8A7462',
    border: '#EFE0D0',
    accent: '#E8590C',
    /** Мягкая подложка под акцентом: активная вкладка, выбранное. */
    accentSoft: '#FDE3CF',
    onAccent: '#FFFFFF',
    warning: '#854F0B',
    backgroundWarning: '#FAEEDA',
    danger: '#A32D2D',
    backgroundDanger: '#FCEBEB',
    success: '#3B6D11',
    backgroundSuccess: '#EAF3DE',
  },
  dark: {
    text: '#F6EDE4',
    background: '#17120E',
    backgroundElement: '#241C16',
    backgroundSelected: '#33291F',
    textSecondary: '#B9A898',
    border: '#33291F',
    accent: '#FF922B',
    accentSoft: '#3D2612',
    onAccent: '#1A1200',
    warning: '#FAC775',
    backgroundWarning: '#3A2A10',
    danger: '#F09595',
    backgroundDanger: '#3D1E1E',
    success: '#97C459',
    backgroundSuccess: '#1F3317',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

type CategoryColor = { background: string; icon: string };

/**
 * Цвет категории продукта: подложка и иконка. Цвет несёт смысл — по нему
 * категорию узнаёшь раньше, чем читаешь слово, — поэтому один и тот же
 * везде, где встречается продукт. Янтарный не занят: он у «скоро истекает».
 */
export const CategoryColors: Record<'light' | 'dark', Record<Category, CategoryColor>> = {
  light: {
    молочное: { background: '#E6F1FB', icon: '#185FA5' },
    мясо: { background: '#FCEBEB', icon: '#A32D2D' },
    рыба: { background: '#E1F5EE', icon: '#0F6E56' },
    овощи: { background: '#EAF3DE', icon: '#3B6D11' },
    зелень: { background: '#EEF6D8', icon: '#4E7A12' },
    фрукты: { background: '#FBEAF0', icon: '#993556' },
    крупы: { background: '#F3EADF', icon: '#7A5A3A' },
    бакалея: { background: '#EEEDFE', icon: '#534AB7' },
    заморозка: { background: '#E3F6FB', icon: '#1A7690' },
  },
  dark: {
    молочное: { background: '#1E3246', icon: '#85B7EB' },
    мясо: { background: '#3D1E1E', icon: '#F09595' },
    рыба: { background: '#133A30', icon: '#5DCAA5' },
    овощи: { background: '#22341A', icon: '#97C459' },
    зелень: { background: '#29351A', icon: '#B3D66A' },
    фрукты: { background: '#3E1A2A', icon: '#ED93B1' },
    крупы: { background: '#33291F', icon: '#D3C2AE' },
    бакалея: { background: '#2A2548', icon: '#AFA9EC' },
    заморозка: { background: '#17323D', icon: '#7FD0E8' },
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
