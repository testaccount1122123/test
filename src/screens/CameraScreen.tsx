import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ScreenContainer';
import { GradientButton } from '@/components/GradientButton';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';
import { useNutrition } from '@/navigation/NutritionContext';
import { formatCalories, formatMacro } from '@/utils/formatters';

export const CameraScreen = () => {
  const { items, isAnalyzing, error, pickImage, takePhoto } = useNutrition();
  const latest = items[0];

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Feather name="camera" size={28} color={palette.surface} />
          <Text style={styles.heroTitle}>Snap or upload your meal</Text>
          <Text style={styles.heroSubtitle}>AI handles the calorie counting instantly.</Text>
          <GradientButton label="Snap a Photo" onPress={takePhoto} />
          <GradientButton
            label="Upload from Library"
            onPress={pickImage}
            startColor="#6C8CFF"
            endColor="#87A7FF"
          />
          {isAnalyzing && (
            <View style={styles.loadingRow}>
              <ActivityIndicator color={palette.surface} />
              <Text style={styles.loadingText}>Analyzing meal...</Text>
            </View>
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        {latest && (
          <View style={styles.analysisCard}>
            <Text style={styles.analysisTitle}>Latest analysis</Text>
            <Image source={{ uri: latest.imageUri }} style={styles.analysisImage} />
            <Text style={styles.foodName}>{latest.detectedFood ?? 'Meal'}</Text>
            <View style={styles.macroRow}>
              <View style={styles.macroCol}>
                <Text style={styles.macroLabel}>Calories</Text>
                <Text style={styles.macroValue}>{formatCalories(latest.calories)}</Text>
              </View>
              <View style={styles.macroCol}>
                <Text style={styles.macroLabel}>Protein</Text>
                <Text style={styles.macroValue}>{formatMacro(latest.protein)}</Text>
              </View>
              <View style={styles.macroCol}>
                <Text style={styles.macroLabel}>Carbs</Text>
                <Text style={styles.macroValue}>{formatMacro(latest.carbs)}</Text>
              </View>
              <View style={styles.macroCol}>
                <Text style={styles.macroLabel}>Fats</Text>
                <Text style={styles.macroValue}>{formatMacro(latest.fats)}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: palette.primary,
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    gap: 12,
  },
  heroTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: palette.surface,
  },
  heroSubtitle: {
    color: `${palette.surface}CC`,
    textAlign: 'center',
    fontSize: fontSizes.sm,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: palette.surface,
    fontWeight: '600',
  },
  errorText: {
    color: '#FFDADA',
    textAlign: 'center',
  },
  analysisCard: {
    backgroundColor: palette.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: palette.border,
  },
  analysisTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 16,
  },
  analysisImage: {
    width: '100%',
    height: 180,
    borderRadius: 18,
    backgroundColor: '#DDE4FF',
    marginBottom: 16,
  },
  foodName: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 12,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroCol: {
    flex: 1,
    alignItems: 'center',
  },
  macroLabel: {
    color: palette.mutedText,
    fontSize: fontSizes.sm,
  },
  macroValue: {
    fontWeight: '700',
    fontSize: fontSizes.lg,
    color: palette.text,
    marginTop: 6,
  },
});
