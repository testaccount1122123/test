import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';
import { Feather } from '@expo/vector-icons';

interface PaywallFeatureListProps {
  features: string[];
}

export const PaywallFeatureList = ({ features }: PaywallFeatureListProps) => (
  <View style={styles.container}>
    {features.map((feature) => (
      <View key={feature} style={styles.row}>
        <View style={styles.iconCircle}>
          <Feather name="check" size={16} color={palette.surface} />
        </View>
        <Text style={styles.label}>{feature}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontSize: fontSizes.md,
    color: palette.text,
    fontWeight: '600',
  },
});
