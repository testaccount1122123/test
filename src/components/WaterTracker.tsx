import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';

interface WaterTrackerProps {
  consumed: number;
  goal: number;
}

export const WaterTracker = ({ consumed, goal }: WaterTrackerProps) => {
  const drops = useMemo(() => new Array(goal).fill(null), [goal]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Water Intake</Text>
        <Text style={styles.subtitle}>
          {consumed} / {goal} glasses
        </Text>
      </View>
      <View style={styles.dropsRow}>
        {drops.map((_, index) => {
          const isFilled = index < consumed;
          return <View key={index} style={[styles.drop, isFilled && styles.dropFilled]} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.surface,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.border,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: palette.text,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    color: palette.mutedText,
  },
  dropsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  drop: {
    width: 32,
    height: 48,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D0DBFF',
    backgroundColor: 'transparent',
  },
  dropFilled: {
    backgroundColor: '#A9C4FF',
  },
});
