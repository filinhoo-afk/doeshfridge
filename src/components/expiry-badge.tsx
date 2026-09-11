import { StyleSheet, View } from 'react-native';

import { expiryLabel, expiryStatus } from '@/data/shelf-life';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { ThemedText } from './themed-text';

type ExpiryBadgeProps = {
  expiresAt: string | null;
  /** Уточнение перед меткой: «1 шт» → «1 шт истекает завтра». */
  prefix?: string;
};

/**
 * Цветная метка близкого срока. Для дальних сроков и продуктов без срока
 * ничего не рисует: метка должна означать «этим стоит заняться».
 */
export function ExpiryBadge({ expiresAt, prefix }: ExpiryBadgeProps) {
  const theme = useTheme();
  const label = expiryLabel(expiresAt);

  if (!label) {
    return null;
  }

  const status = expiryStatus(expiresAt);
  const palette = {
    expired: { background: theme.backgroundDanger, text: theme.danger },
    soon: { background: theme.backgroundWarning, text: theme.warning },
    ok: { background: theme.backgroundElement, text: theme.textSecondary },
  }[status];

  return (
    <View style={[styles.badge, { backgroundColor: palette.background }]}>
      <ThemedText type="small" style={[styles.label, { color: palette.text }]}>
        {prefix ? `${prefix} ${label}` : label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: 1,
  },
  label: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
});
