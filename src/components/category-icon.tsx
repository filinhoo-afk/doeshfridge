import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';

import type { Category } from '@/data/ingredients';
import { useCategoryColors } from '@/hooks/use-theme';

/**
 * В Ionicons нет ни коровы, ни колоса, поэтому для категорий — Material Community Icons.
 * Иконки проверены в мелком размере: сыр читался как кнопка «play», ножка — как ключ, солонка — как карандаш.
 */
const ICONS: Record<Category, keyof typeof MaterialCommunityIcons.glyphMap> = {
  молочное: 'cow',
  мясо: 'food-steak',
  рыба: 'fish',
  овощи: 'carrot',
  зелень: 'leaf',
  фрукты: 'fruit-cherries',
  крупы: 'barley',
  бакалея: 'sack',
  заморозка: 'snowflake',
};

/** Иконка категории в цветном круге. */
export function CategoryIcon({ category, size = 28 }: { category: Category; size?: number }) {
  const colors = useCategoryColors()[category];

  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: colors.background },
      ]}>
      <MaterialCommunityIcons name={ICONS[category]} size={size * 0.64} color={colors.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
