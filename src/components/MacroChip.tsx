import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';

interface MacroChipProps {
  label: string;
  value: string;
  remaining?: string;
}

export const MacroChip = ({ label, value, remaining }: MacroChipProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
    {remaining && <Text style={styles.remaining}>{remaining}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: palette.border,
    minWidth: 100,
  },
  label: {
    fontSize: fontSizes.sm,
    color: palette.mutedText,
    marginBottom: 4,
    fontWeight: '600',
  },
  value: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: palette.text,
  },
  remaining: {
    marginTop: 4,
    fontSize: fontSizes.xs,
    color: palette.mutedText,
  },
});
