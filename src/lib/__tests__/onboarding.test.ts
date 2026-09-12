import { useOnboarding } from '@/store/onboarding';

jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- штатный способ подменить нативный модуль в jest
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

beforeEach(() => {
  useOnboarding.setState({ seen: false, hydrated: false });
});

describe('приветствие', () => {
  it('на чистой установке ещё не показано', () => {
    expect(useOnboarding.getState().seen).toBe(false);
  });

  it('после показа больше не всплывает', () => {
    useOnboarding.getState().markSeen();
    expect(useOnboarding.getState().seen).toBe(true);

    // Повторный вызов — из настроек, например — ничего не ломает.
    useOnboarding.getState().markSeen();
    expect(useOnboarding.getState().seen).toBe(true);
  });

  it('в хранилище уходит только факт показа', () => {
    const state = { seen: true, hydrated: true, markSeen: () => {} };
    expect(useOnboarding.persist.getOptions().partialize?.(state)).toEqual({ seen: true });
  });
});
