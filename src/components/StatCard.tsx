import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';

interface StatCardProps {
  label: string;
  value: string;
  description?: string;
  statusBadge?: ReactNode;
  rightAccessory?: ReactNode;
}

export const StatCard = ({ label, value, description, statusBadge, rightAccessory }: StatCardProps) => {
  return (
    <LinearGradient colors={[palette.surface, '#EEF2FF']} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {statusBadge}
      </View>
      <View style={styles.contentRow}>
        <Text style={styles.value}>{value}</Text>
        {rightAccessory}
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#1F2A6B',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: fontSizes.md,
    color: palette.mutedText,
    fontWeight: '600',
  },
  value: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: palette.text,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  description: {
    marginTop: 12,
    color: palette.mutedText,
    fontSize: fontSizes.sm,
    lineHeight: 20,
  },
});
