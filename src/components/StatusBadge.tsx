import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';

interface StatusBadgeProps {
  label: string;
  tone?: 'success' | 'warning' | 'default';
}

const toneToColor: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  success: palette.success,
  warning: palette.warning,
  default: palette.primary,
};

export const StatusBadge = ({ label, tone = 'default' }: StatusBadgeProps) => (
  <View style={[styles.badge, { backgroundColor: `${toneToColor[tone]}22` }]}> 
    <Text style={[styles.label, { color: toneToColor[tone] }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
});
