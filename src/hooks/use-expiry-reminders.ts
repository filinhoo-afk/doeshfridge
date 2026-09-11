import { useEffect } from 'react';

import { syncReminders } from '@/lib/notifications';
import { useFridge } from '@/store/fridge';

/**
 * Держит системные напоминания в согласии с холодильником: любое изменение
 * продуктов, сроков или настройки пересобирает расписание. Подключается один
 * раз — в корневом layout.
 */
export function useExpiryReminders() {
  const items = useFridge((state) => state.items);
  const enabled = useFridge((state) => state.remindersEnabled);
  const hydrated = useFridge((state) => state.hydrated);

  useEffect(() => {
    // До загрузки хранилища холодильник пуст — не стираем запланированное зря.
    if (!hydrated) {
      return;
    }
    void syncReminders(items, enabled);
  }, [items, enabled, hydrated]);
}
