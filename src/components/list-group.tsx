import Ionicons from '@expo/vector-icons/Ionicons';
import { Children, Fragment, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { ThemedText } from './themed-text';

type ListGroupProps = {
  title?: string;
  /** Пояснение под группой — мелким текстом, без отдельной карточки. */
  footer?: string;
  children: ReactNode;
};

/**
 * Строки на одной подложке с тонкими разделителями, как в системных настройках.
 * Отдельная карточка на каждый пункт даёт много рамок и отступов — визуальный шум.
 */
export function ListGroup({ title, footer, children }: ListGroupProps) {
  const theme = useTheme();
  // Children.toArray отбрасывает null и false — условные строки не оставляют пустых разделителей.
  const rows = Children.toArray(children);

  return (
    <View style={styles.group}>
      {title ? (
        <ThemedText type="smallBold" themeColor="textSecondary" style={styles.title}>
          {title.toUpperCase()}
        </ThemedText>
      ) : null}
      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        {rows.map((row, index) => (
          <Fragment key={index}>
            {index > 0 ? <View style={[styles.divider, { backgroundColor: theme.border }]} /> : null}
            {row}
          </Fragment>
        ))}
      </View>
      {footer ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.footer}>
          {footer}
        </ThemedText>
      ) : null}
    </View>
  );
}

type ListRowProps = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  /** Справа: переключатель, число. Без него у нажимаемой строки — стрелка. */
  accessory?: ReactNode;
  /** Своя иконка справа вместо стрелки — например, для раскрывающейся строки. */
  trailingIcon?: keyof typeof Ionicons.glyphMap;
  tone?: 'default' | 'accent' | 'danger';
  disabled?: boolean;
};

export function ListRow({
  title,
  subtitle,
  onPress,
  accessory,
  trailingIcon,
  tone = 'default',
  disabled = false,
}: ListRowProps) {
  const theme = useTheme();
  const titleColor = { default: theme.text, accent: theme.accent, danger: theme.danger }[tone];
  const icon = trailingIcon ?? (onPress && !accessory && tone === 'default' ? 'chevron-forward' : null);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || !onPress}
      onPress={onPress}
      style={({ pressed }) => [styles.row, { opacity: disabled ? 0.4 : pressed ? 0.6 : 1 }]}>
      <View style={styles.text}>
        <ThemedText style={{ color: titleColor }}>{title}</ThemedText>
        {subtitle ? (
          <ThemedText type="small" themeColor="textSecondary">
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      {accessory}
      {icon ? <Ionicons name={icon} size={18} color={theme.textSecondary} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: Spacing.two,
  },
  title: {
    letterSpacing: 0.6,
    paddingHorizontal: Spacing.three,
  },
  card: {
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: Spacing.three,
  },
  footer: {
    paddingHorizontal: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 52,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  text: {
    flex: 1,
    gap: Spacing.half,
  },
});
