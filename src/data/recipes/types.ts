import type { Unit } from '../ingredients';

export type RecipeIngredient = {
  ingredientId: string;
  amount?: number;
  unit?: Unit;
  /** Необязательный ингредиент — не влияет на подбор. */
  optional?: boolean;
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  timeMinutes: number;
  servings: number;
  tags: string[];
  ingredients: RecipeIngredient[];
  /** Посуда и инструменты — чтобы собрать всё нужное до начала. */
  equipment?: string[];
  /** Что сделать заранее: достать из холодильника, разморозить, разогреть духовку. */
  prep?: string[];
  /** Шаги с количествами, силой огня и признаками готовности. */
  steps: string[];
  /** Советы и частые ошибки. */
  tips?: string[];
};
