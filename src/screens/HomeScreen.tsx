import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { MacroChip } from '@/components/MacroChip';
import { WaterTracker } from '@/components/WaterTracker';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';
import { useNutrition } from '@/navigation/NutritionContext';
import { formatCalories, formatMacro } from '@/utils/formatters';

const macroGoals = {
  protein: 150,
  carbs: 200,
  fats: 65,
};

export const HomeScreen = () => {
  const { totals, items } = useNutrition();
  const goalCalories = 2400;
  const caloriesLeft = Math.max(goalCalories - totals.calories, 0);
  const macros = [
    { label: 'Protein left', value: macroGoals.protein - totals.protein, unit: 'g' },
    { label: 'Carbs left', value: macroGoals.carbs - totals.carbs, unit: 'g' },
    { label: 'Fats left', value: macroGoals.fats - totals.fats, unit: 'g' },
  ];

  return (
    <ScreenContainer>
      <View style={styles.headerRow}>
        <Text style={styles.logo}>nutrisnap.ai</Text>
        <View style={styles.streak}>
          <Text style={styles.streakText}>3</Text>
        </View>
      </View>
      <StatCard
        label="Calories left"
        value={caloriesLeft.toString()}
        description={`Consumed: ${formatCalories(totals.calories)}    Goal: ${formatCalories(goalCalories)}`}
        statusBadge={<StatusBadge label={caloriesLeft > 0 ? 'On track' : 'Goal met'} tone={caloriesLeft > 0 ? 'success' : 'default'} />}
      />
      <WaterTracker consumed={0} goal={8} />
      <View style={styles.macroRow}>
        {macros.map((macro) => (
          <MacroChip key={macro.label} label={macro.label} value={formatMacro(Math.max(macro.value, 0))} />
        ))}
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recently uploaded</Text>
        <Text style={styles.sectionSubtitle}>{items.length ? '' : 'No food detected'}</Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.timestamp.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No food detected</Text>}
        renderItem={({ item }) => (
          <View style={styles.recentCard}>
            <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
            <View style={{ flex: 1 }}>
              <Text style={styles.foodTitle}>{item.detectedFood ?? 'Meal'}</Text>
              <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionPill}>{formatCalories(item.calories)}</Text>
                <Text style={styles.nutritionPill}>{formatMacro(item.protein)} P</Text>
                <Text style={styles.nutritionPill}>{formatMacro(item.carbs)} C</Text>
                <Text style={styles.nutritionPill}>{formatMacro(item.fats)} F</Text>
              </View>
            </View>
          </View>
        )}
        style={{ marginTop: 8 }}
        contentContainerStyle={{ paddingBottom: 24 }}
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
  logo: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: palette.primary,
  },
  streak: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${palette.accent}22`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakText: {
    color: palette.accent,
    fontWeight: '700',
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: palette.text,
  },
  sectionSubtitle: {
    color: palette.mutedText,
    marginTop: 4,
  },
  recentCard: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    marginBottom: 12,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#D6DFFF',
  },
  foodTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: palette.text,
  },
  timestamp: {
    fontSize: fontSizes.xs,
    color: palette.mutedText,
    marginTop: 2,
  },
  nutritionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  nutritionPill: {
    backgroundColor: palette.inputBackground,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: fontSizes.xs,
    color: palette.mutedText,
  },
  emptyText: {
    textAlign: 'center',
    color: palette.mutedText,
    paddingVertical: 24,
  },
});
