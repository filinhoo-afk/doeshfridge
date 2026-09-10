import { Alert, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { PrimaryButton } from '@/components/primary-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { INGREDIENTS } from '@/data/ingredients';
import { RECIPES } from '@/data/recipes';
import { useTheme } from '@/hooks/use-theme';
import { formatProducts } from '@/lib/format';
import { useFridge } from '@/store/fridge';

const PANTRY_NAMES = INGREDIENTS.filter((ingredient) => ingredient.pantry)
  .map((ingredient) => ingredient.name)
  .join(', ');

export default function SettingsScreen() {
  const theme = useTheme();
  const items = useFridge((state) => state.items);
  const assumePantry = useFridge((state) => state.assumePantry);
  const setAssumePantry = useFridge((state) => state.setAssumePantry);
  const clearAll = useFridge((state) => state.clearAll);

  const confirmClear = () => {
    if (items.length === 0) {
      return;
    }
    Alert.alert(
      'Очистить холодильник?',
      `Будут удалены все ${formatProducts(items.length)}. Отменить это нельзя.`,
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Очистить', style: 'destructive', onPress: clearAll },
      ],
    );
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        <View style={styles.switchRow}>
          <View style={styles.switchLabel}>
            <ThemedText style={styles.title}>Базовые продукты всегда есть</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Соль, мука, масло и специи не считаются недостающими при подборе рецептов.
            </ThemedText>
          </View>
          <Switch
            value={assumePantry}
            onValueChange={setAssumePantry}
            trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
            thumbColor={theme.background}
          />
        </View>
        <ThemedText type="small" themeColor="textSecondary">
          {PANTRY_NAMES}
        </ThemedText>
      </View>

      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText style={styles.title}>База</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {RECIPES.length} рецептов и {INGREDIENTS.length} продуктов в справочнике. Всё хранится на
          устройстве: без аккаунта, без интернета, без отправки данных куда-либо.
        </ThemedText>
      </View>

      <PrimaryButton
        title="Очистить холодильник"
        icon="trash-outline"
        variant="danger"
        disabled={items.length === 0}
        onPress={confirmClear}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  card: {
    gap: Spacing.two,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  switchLabel: {
    flex: 1,
    gap: Spacing.one,
  },
  title: {
    fontWeight: '600',
  },
});
