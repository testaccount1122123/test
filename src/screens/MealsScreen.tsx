import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SegmentedControl } from '@/components/SegmentedControl';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';
import { PressableOpacity } from '@/components/pressableOpacity';
import { useNutrition } from '@/navigation/NutritionContext';
import { formatCalories, formatMacro } from '@/utils/formatters';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
  { label: 'Snacks', value: 'snacks' },
] as const;

const defaultMeals = [
  { id: '1', title: 'Grilled Chicken Salad', calories: 420, protein: 38, carbs: 20, fats: 18, category: 'lunch' },
  { id: '2', title: 'Almonds (handful)', calories: 160, protein: 6, carbs: 6, fats: 14, category: 'snacks' },
  { id: '3', title: 'Test Meal', calories: 500, protein: 30, carbs: 40, fats: 20, category: 'dinner' },
];

type FilterValue = (typeof filters)[number]['value'];

export const MealsScreen = () => {
  const { items } = useNutrition();
  const [filter, setFilter] = useState<FilterValue>('all');
  const [query, setQuery] = useState('');

  const combinedMeals = [
    ...items.map((item, index) => ({
      id: `dynamic-${index}`,
      title: item.detectedFood ?? 'Meal',
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fats: item.fats,
      category: 'all',
    })),
    ...defaultMeals,
  ];

  const todayTotals = combinedMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const filteredMeals = combinedMeals.filter((meal) => {
    const matchesQuery = meal.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'all' || meal.category === filter || meal.category === 'all';
    return matchesQuery && matchesFilter;
  });

  return (
    <ScreenContainer>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerTitle}>Today totals</Text>
          <Text style={styles.headerSubtitle}>
            {formatCalories(todayTotals.calories)} · Protein: {formatMacro(todayTotals.protein)} · Carbs:{' '}
            {formatMacro(todayTotals.carbs)} · Fats: {formatMacro(todayTotals.fats)}
          </Text>
        </View>
        <PressableOpacity style={styles.quickAdd}>
          <Text style={styles.quickAddLabel}>+ Quick Add</Text>
        </PressableOpacity>
      </View>
      <SegmentedControl options={filters} value={filter} onChange={setFilter} />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search meals..."
        style={styles.searchInput}
        placeholderTextColor={palette.mutedText}
      />
      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.mealCard}>
            <View>
              <Text style={styles.mealTitle}>{item.title}</Text>
              <Text style={styles.macroSummary}>
                {formatCalories(item.calories)} · {formatMacro(item.protein)} P · {formatMacro(item.carbs)} C ·{' '}
                {formatMacro(item.fats)} F
              </Text>
            </View>
            <PressableOpacity style={styles.removeButton}>
              <Text style={styles.removeButtonLabel}>✕</Text>
            </PressableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: palette.text,
  },
  headerSubtitle: {
    color: palette.mutedText,
    marginTop: 6,
  },
  quickAdd: {
    backgroundColor: palette.primary,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  quickAddLabel: {
    color: palette.surface,
    fontWeight: '700',
  },
  searchInput: {
    backgroundColor: palette.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    color: palette.text,
  },
  mealCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: palette.border,
    marginBottom: 12,
  },
  mealTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: palette.text,
  },
  macroSummary: {
    color: palette.mutedText,
    marginTop: 6,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonLabel: {
    color: palette.mutedText,
    fontSize: fontSizes.md,
  },
});
