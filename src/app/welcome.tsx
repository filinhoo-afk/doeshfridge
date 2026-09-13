import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/primary-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { RECIPES } from '@/data/recipes';
import { useTheme } from '@/hooks/use-theme';
import { useOnboarding } from '@/store/onboarding';

type Step = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text: string;
};

const STEPS: Step[] = [
  {
    icon: 'mic-outline',
    title: 'Продиктуйте продукты',
    text: 'Нажмите «Продиктовать» и перечислите всё вслух одним предложением: «молоко, три яйца, помидоры и куриное филе». Список можно поправить до того, как он попадёт в холодильник.',
  },
  {
    icon: 'restaurant-outline',
    title: 'Смотрите, что получается',
    text: `На вкладке «Рецепты» блюда разложены по секциям: что готовится прямо сейчас, а где не хватает одного продукта. В базе ${RECIPES.length} рецептов — есть поиск, фильтры по времени и пересчёт порций.`,
  },
  {
    icon: 'time-outline',
    title: 'Ставьте сроки',
    text: 'Откройте продукт и укажите, до какого числа он годен. Приложение напомнит доесть его вовремя, а не после.',
  },
  {
    icon: 'checkmark-done-outline',
    title: 'Готовьте и списывайте',
    text: 'Кнопка «Приготовил» в рецепте сама уберёт из холодильника то, что ушло в блюдо.',
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const markSeen = useOnboarding((state) => state.markSeen);

  // Отмечаем при уходе с экрана, а не по кнопке: закрыли свайпом — тоже видели.
  useEffect(() => () => markSeen(), [markSeen]);

  return (
    <View style={[styles.screen, { backgroundColor: theme.background, paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Доешь</ThemedText>
          <ThemedText themeColor="textSecondary">
            Продукты есть, а что готовить — непонятно, и половина в итоге пропадает. Приложение
            подбирает рецепты из того, что уже лежит в холодильнике.
          </ThemedText>
        </View>

        {STEPS.map((step) => (
          <View key={step.title} style={styles.step}>
            <View style={[styles.icon, { backgroundColor: theme.accentSoft }]}>
              <Ionicons name={step.icon} size={22} color={theme.accent} />
            </View>
            <View style={styles.stepText}>
              <ThemedText style={styles.stepTitle}>{step.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {step.text}
              </ThemedText>
            </View>
          </View>
        ))}

        <View style={[styles.privacy, { backgroundColor: theme.backgroundElement }]}>
          <Ionicons name="lock-closed-outline" size={18} color={theme.textSecondary} />
          <ThemedText type="small" themeColor="textSecondary" style={styles.privacyText}>
            Всё хранится на телефоне: без аккаунта, без интернета, без отправки данных куда-либо.
          </ThemedText>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { borderTopColor: theme.border, paddingBottom: insets.bottom + Spacing.three },
        ]}>
        <PrimaryButton title="Понятно" icon="arrow-forward" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: Spacing.three,
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.two,
    paddingTop: Spacing.three,
  },
  step: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    flex: 1,
    gap: Spacing.half,
  },
  stepTitle: {
    fontWeight: '600',
  },
  privacy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  privacyText: {
    flex: 1,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
  },
});
