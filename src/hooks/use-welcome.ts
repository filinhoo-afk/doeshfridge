import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

import { useOnboarding } from '@/store/onboarding';

/**
 * Первый запуск: показываем приветствие, но только после того, как стор поднялся
 * из хранилища. До этого `seen` всегда false — покажи мы окно сразу, оно мелькало
 * бы при каждом старте.
 */
export function useWelcome() {
  const router = useRouter();
  const seen = useOnboarding((state) => state.seen);
  const hydrated = useOnboarding((state) => state.hydrated);
  const opened = useRef(false);

  useEffect(() => {
    if (!hydrated || seen || opened.current) {
      return;
    }
    opened.current = true;
    router.push('/welcome');
  }, [hydrated, seen, router]);
}
