import { Appearance } from 'react-native';

import { usePreferences } from '@/store/preferences';

jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- штатный способ подменить нативный модуль в jest
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('тема приложения', () => {
  const setColorScheme = jest.spyOn(Appearance, 'setColorScheme').mockImplementation(() => {});

  beforeEach(() => {
    setColorScheme.mockClear();
  });

  it('по умолчанию следует за системой', () => {
    expect(usePreferences.getState().theme).toBe('system');
  });

  it('своя тема запоминается и сразу применяется', () => {
    usePreferences.getState().setTheme('dark');

    expect(usePreferences.getState().theme).toBe('dark');
    expect(setColorScheme).toHaveBeenLastCalledWith('dark');
  });

  it('«системная» снимает подмену, а не ставит светлую', () => {
    usePreferences.getState().setTheme('system');

    expect(setColorScheme).toHaveBeenLastCalledWith('unspecified');
  });
});
