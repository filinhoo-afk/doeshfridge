import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { ThemedText } from './themed-text';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'accent' | 'outline' | 'danger';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  title,
  onPress,
  icon,
  variant = 'accent',
  disabled = false,
  style,
}: PrimaryButtonProps) {
  const theme = useTheme();

  const palette = {
    accent: { background: theme.accent, text: theme.onAccent, border: 'transparent' },
    outline: { background: 'transparent', text: theme.text, border: theme.border },
    danger: { background: 'transparent', text: theme.danger, border: theme.border },
  }[variant];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: palette.background,
          borderColor: palette.border,
          opacity: disabled ? 0.4 : pressed ? 0.8 : 1,
        },
        style,
      ]}>
      {icon ? <Ionicons name={icon} size={20} color={palette.text} /> : null}
      <ThemedText style={[styles.title, { color: palette.text }]}>{title}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    borderRadius: Spacing.three,
    borderWidth: 1,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  title: {
    fontWeight: '600',
  },
});
