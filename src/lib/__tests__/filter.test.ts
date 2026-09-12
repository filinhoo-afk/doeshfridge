import { RECIPES, getRecipe } from '@/data/recipes';

import { EMPTY_FILTERS, filterRecipes, isFilterActive } from '../recipe-filter';
import { formatServingsFor } from '../format';
import { scaleAmount, scaleRecipe } from '../scale';

const find = (recipes: { id: string }[], id: string) => recipes.some((recipe) => recipe.id === id);

describe('поиск рецептов', () => {
  it('пустой фильтр ничего не отсеивает и не считается активным', () => {
    expect(isFilterActive(EMPTY_FILTERS)).toBe(false);
    expect(filterRecipes(RECIPES, EMPTY_FILTERS)).toHaveLength(RECIPES.length);
  });

  it('находит по названию, в том числе по началу слова', () => {
    const found = filterRecipes(RECIPES, { ...EMPTY_FILTERS, query: 'борщ' });

    expect(find(found, 'borsch')).toBe(true);
    expect(find(found, 'postnyi_borsch')).toBe(true);
    expect(find(found, 'olivie')).toBe(false);
  });

  it('находит по продукту, которого нет в названии', () => {
    const found = filterRecipes(RECIPES, { ...EMPTY_FILTERS, query: 'творог' });

    expect(find(found, 'syrniki')).toBe(true);
  });

  it('переживает другую форму слова', () => {
    const found = filterRecipes(RECIPES, { ...EMPTY_FILTERS, query: 'помидоры' });

    expect(find(found, 'yaichnica_pomidory')).toBe(true);
  });

  it('несколько слов сужают выдачу, а не расширяют', () => {
    const one = filterRecipes(RECIPES, { ...EMPTY_FILTERS, query: 'суп' });
    const two = filterRecipes(RECIPES, { ...EMPTY_FILTERS, query: 'суп грибной' });

    expect(two.length).toBeLessThan(one.length);
    expect(two.every((recipe) => recipe.title.toLowerCase().includes('гриб'))).toBe(true);
  });

  it('фильтр по времени не пропускает долгое', () => {
    const found = filterRecipes(RECIPES, { ...EMPTY_FILTERS, maxMinutes: 15 });

    expect(found.length).toBeGreaterThan(0);
    expect(found.every((recipe) => recipe.timeMinutes <= 15)).toBe(true);
  });

  it('несколько тегов складываются: нужен рецепт со всеми', () => {
    const found = filterRecipes(RECIPES, { ...EMPTY_FILTERS, tags: ['суп', 'постное'] });

    expect(found.length).toBeGreaterThan(0);
    expect(
      found.every((recipe) => recipe.tags.includes('суп') && recipe.tags.includes('постное')),
    ).toBe(true);
  });
});

describe('пересчёт порций', () => {
  it('граммы округляются тем крупнее, чем больше число', () => {
    expect(scaleAmount(500, 'г', 2)).toBe(1000);
    expect(scaleAmount(80, 'г', 1.5)).toBe(120);
    expect(scaleAmount(30, 'г', 1.5)).toBe(45);
    expect(scaleAmount(10, 'г', 0.5)).toBe(5);
  });

  it('штуки округляются до половины и не исчезают совсем', () => {
    expect(scaleAmount(3, 'шт', 2)).toBe(6);
    expect(scaleAmount(1, 'шт', 0.5)).toBe(0.5);
    expect(scaleAmount(1, 'шт', 0.1)).toBe(0.5);
  });

  it('на том же числе порций рецепт не меняется', () => {
    const recipe = getRecipe('borsch')!;

    expect(scaleRecipe(recipe, recipe.servings)).toBe(recipe);
  });

  it('удваивает количества и оставляет ингредиенты без числа как есть', () => {
    const recipe = getRecipe('borsch')!;
    const doubled = scaleRecipe(recipe, recipe.servings * 2);

    const beef = doubled.ingredients.find((item) => item.ingredientId === 'beef');
    const salt = doubled.ingredients.find((item) => item.ingredientId === 'salt');

    expect(doubled.servings).toBe(recipe.servings * 2);
    expect(beef?.amount).toBe(1000);
    expect(salt?.amount).toBeUndefined();
  });
});

describe('склонение порций', () => {
  it('в винительном падеже: пересчитано на сколько', () => {
    expect(formatServingsFor(1)).toBe('1 порцию');
    expect(formatServingsFor(2)).toBe('2 порции');
    expect(formatServingsFor(5)).toBe('5 порций');
    expect(formatServingsFor(21)).toBe('21 порцию');
  });
});
