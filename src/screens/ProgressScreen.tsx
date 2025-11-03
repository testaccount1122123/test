import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';
import { GradientButton } from '@/components/GradientButton';

const timeframes = ['90 Days', '6 Months', '1 Year', 'All time'] as const;

export const ProgressScreen = () => {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>My Weight</Text>
            <Text style={styles.metricValue}>1000 lbs</Text>
            <Text style={styles.metricSubtext}>Goal 70 lbs</Text>
            <GradientButton label="Log Weight" onPress={() => {}} />
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Day Streak</Text>
            <Text style={styles.metricValue}>3</Text>
            <Text style={styles.metricSubtext}>SMTWTFS</Text>
          </View>
        </View>
        <View style={styles.timeframeRow}>
          {timeframes.map((frame, index) => (
            <View key={frame} style={[styles.timeframePill, index === 0 && styles.timeframePillActive]}>
              <Text style={[styles.timeframeLabel, index === 0 && styles.timeframeLabelActive]}>{frame}</Text>
            </View>
          ))}
        </View>
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>68% of goal</Text>
          <View style={styles.chartLine} />
          <Text style={styles.chartSubtext}>Keep showing up — consistency compounds.</Text>
        </View>
        <View style={styles.motivationCard}>
          <Text style={styles.motivationTitle}>Great job! Consistency is key — you're mastering it.</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: palette.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 20,
    shadowColor: '#1F2A6B',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
  },
  metricLabel: {
    color: palette.mutedText,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: palette.text,
    marginVertical: 8,
  },
  metricSubtext: {
    color: palette.mutedText,
    fontSize: fontSizes.sm,
  },
  timeframeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeframePill: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: palette.inputBackground,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  timeframePillActive: {
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.primary,
  },
  timeframeLabel: {
    color: palette.mutedText,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
  timeframeLabelActive: {
    color: palette.primary,
  },
  chartCard: {
    backgroundColor: palette.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 24,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 16,
  },
  chartLine: {
    height: 120,
    borderRadius: 16,
    backgroundColor: '#E0E6FF',
    marginBottom: 16,
  },
  chartSubtext: {
    color: palette.mutedText,
    fontSize: fontSizes.sm,
    textAlign: 'center',
  },
  motivationCard: {
    backgroundColor: '#EDEBFF',
    borderRadius: 24,
    padding: 20,
  },
  motivationTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: palette.text,
    textAlign: 'center',
  },
});
