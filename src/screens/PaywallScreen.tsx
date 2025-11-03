import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ScreenContainer';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';
import { GradientButton } from '@/components/GradientButton';
import { PaywallFeatureList } from '@/components/PaywallFeatureList';
import { useAppState } from '@/navigation/AppStateContext';

const features = [
  'Unlimited AI-powered meal analysis',
  'Macro and calorie breakdown for every snap',
  'Personalized goals & adaptive insights',
  'Exportable meal history and streak tracking',
];

export const PaywallScreen = () => {
  const { activateSubscription } = useAppState();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.badge}>Premium</Text>
        <Text style={styles.title}>Unlock the full NutriSnap experience</Text>
        <Text style={styles.subtitle}>Invest in your health with unlimited AI meal tracking.</Text>
      </View>
      <LinearGradient colors={[palette.surface, '#EEF2FF']} style={styles.pricingCard}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>$7.99</Text>
          <Text style={styles.priceSuffix}>/ month</Text>
        </View>
        <View style={styles.savingsRow}>
          <Feather name="award" size={18} color={palette.primary} />
          <Text style={styles.savings}>7-day free trial · Cancel anytime</Text>
        </View>
        <PaywallFeatureList features={features} />
        <GradientButton label="Start Free Trial" onPress={activateSubscription} />
        <Text style={styles.disclaimer}>Payment will be charged after the trial if not cancelled.</Text>
      </LinearGradient>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 12,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: `${palette.primary}22`,
    color: palette.primary,
    borderRadius: 999,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: palette.text,
    textAlign: 'center',
    marginTop: 16,
  },
  subtitle: {
    marginTop: 12,
    textAlign: 'center',
    color: palette.mutedText,
    fontSize: fontSizes.md,
    paddingHorizontal: 16,
  },
  pricingCard: {
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: '#1F2A6B',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 16 },
    elevation: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 48,
    fontWeight: '700',
    color: palette.text,
  },
  priceSuffix: {
    marginLeft: 8,
    color: palette.mutedText,
    fontSize: fontSizes.md,
    marginBottom: 8,
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  savings: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: palette.primary,
  },
  disclaimer: {
    marginTop: 16,
    color: palette.mutedText,
    fontSize: fontSizes.xs,
    textAlign: 'center',
  },
});
