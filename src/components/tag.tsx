import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { ThemedText } from './themed-text';

export type TagTone = 'neutral' | 'success' | 'warning';

type TagProps = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  tone?: TagTone;
};

/** Небольшая метка с иконкой: время, готовность рецепта, посуда. Цвет — только когда он что-то значит. */
export function Tag({ label, icon, tone = 'neutral' }: TagProps) {
  const theme = useTheme();
  const palette = {
    neutral: { background: theme.backgroundSelected, text: theme.textSecondary },
    success: { background: theme.backgroundSuccess, text: theme.success },
    warning: { background: theme.backgroundWarning, text: theme.warning },
  }[tone];

  return (
    <View style={[styles.tag, { backgroundColor: palette.background }]}>
      {icon ? <Ionicons name={icon} size={13} color={palette.text} /> : null}
      <ThemedText type="small" style={[styles.label, { color: palette.text }]} numberOfLines={1}>
        {label}
      </ThemedText>
    </View>
  );
}

/** Ряд меток с переносом. */
export function TagRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    maxWidth: '100%',
  },
  label: {
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
