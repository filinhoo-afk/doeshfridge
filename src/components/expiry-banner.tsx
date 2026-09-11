import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ingredientName } from '@/data/ingredients';
import { formatDaysLeft } from '@/data/shelf-life';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { DigestEntry, ExpiryDigest } from '@/store/fridge';

import { ThemedText } from './themed-text';

type ExpiryBannerProps = {
  digest: ExpiryDigest;
  onThrowAway: () => void;
  onCook: () => void;
};

/** Сколько продуктов называть по имени, остальные — «и ещё N». */
const NAMES_SHOWN = 3;

/** Один продукт — одно упоминание: записи уже отсортированы, первая самая срочная. */
function describe(entries: DigestEntry[], withDays: boolean): string {
  const unique = [...new Map(entries.map((entry) => [entry.ingredientId, entry])).values()];
  const firstByIngredient = unique.map(
    (entry) => entries.find((candidate) => candidate.ingredientId === entry.ingredientId) ?? entry,
  );
  const shown = firstByIngredient
    .slice(0, NAMES_SHOWN)
    .map((entry) =>
      withDays
        ? `${ingredientName(entry.ingredientId)} — ${formatDaysLeft(entry.days)}`
        : ingredientName(entry.ingredientId),
    );
  const rest = firstByIngredient.length - shown.length;
  return `${shown.join(', ')}${rest > 0 ? ` и ещё ${rest}` : ''}`;
}

/**
 * Плашка над списком холодильника: что пора выбросить и что скоро истечёт.
 * Кнопки ведут к действию, а не просто информируют.
 */
export function ExpiryBanner({ digest, onThrowAway, onCook }: ExpiryBannerProps) {
  const theme = useTheme();

  if (digest.expired.length === 0 && digest.soon.length === 0) {
    return null;
  }

  return (
    <View style={styles.stack}>
      {digest.expired.length > 0 ? (
        <Notice
          icon="trash-outline"
          title="Пора выбросить"
          text={describe(digest.expired, false)}
          background={theme.backgroundDanger}
          color={theme.danger}
          action="Выбросить"
          onAction={onThrowAway}
        />
      ) : null}
      {digest.soon.length > 0 ? (
        <Notice
          icon="hourglass-outline"
          title="Скоро истекает"
          text={describe(digest.soon, true)}
          background={theme.backgroundWarning}
          color={theme.warning}
          action="Что приготовить"
          onAction={onCook}
        />
      ) : null}
    </View>
  );
}

type NoticeProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text: string;
  background: string;
  color: string;
  action: string;
  onAction: () => void;
};

function Notice({ icon, title, text, background, color, action, onAction }: NoticeProps) {
  return (
    <View style={[styles.notice, { backgroundColor: background }]}>
      <Ionicons name={icon} size={20} color={color} />
      <View style={styles.text}>
        <ThemedText type="smallBold" style={{ color }}>
          {title}
        </ThemedText>
        <ThemedText type="small" style={{ color }}>
          {text}
        </ThemedText>
      </View>
      <Pressable
        accessibilityRole="button"
        hitSlop={Spacing.two}
        onPress={onAction}
        style={({ pressed }) => [styles.action, { borderColor: color, opacity: pressed ? 0.6 : 1 }]}>
        <ThemedText type="small" style={[styles.actionText, { color }]}>
          {action}
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: Spacing.two,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  text: {
    flex: 1,
    gap: Spacing.half,
  },
  action: {
    borderWidth: 1,
    borderRadius: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },
  actionText: {
    fontWeight: '600',
  },
});
