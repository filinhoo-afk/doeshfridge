import { frequentlyCooked, useCookbook } from '@/store/cookbook';

jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- штатный способ подменить нативный модуль в jest
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

beforeEach(() => {
  useCookbook.setState({ favorites: [], cooked: {} });
});

describe('избранное', () => {
  it('добавляет новое в начало и убирает повторным нажатием', () => {
    useCookbook.getState().toggleFavorite('omlet');
    useCookbook.getState().toggleFavorite('bliny');
    expect(useCookbook.getState().favorites).toEqual(['bliny', 'omlet']);

    useCookbook.getState().toggleFavorite('omlet');
    expect(useCookbook.getState().favorites).toEqual(['bliny']);
  });
});

describe('история готовок', () => {
  it('считает каждую готовку и помнит последнюю', () => {
    useCookbook.getState().recordCooked('omlet');
    useCookbook.getState().recordCooked('omlet');

    const record = useCookbook.getState().cooked.omlet;
    expect(record.count).toBe(2);
    expect(Number.isNaN(Date.parse(record.lastAt))).toBe(false);
  });

  it('«часто готовлю» — от двух раз, частые первыми, при равенстве недавние', () => {
    const cooked = {
      omlet: { count: 5, lastAt: '2026-09-01T10:00:00.000Z' },
      bliny: { count: 2, lastAt: '2026-09-10T10:00:00.000Z' },
      pure: { count: 2, lastAt: '2026-09-05T10:00:00.000Z' },
      borsch: { count: 1, lastAt: '2026-09-11T10:00:00.000Z' },
    };

    expect(frequentlyCooked(cooked).map((record) => record.recipeId)).toEqual([
      'omlet',
      'bliny',
      'pure',
    ]);
  });
});
