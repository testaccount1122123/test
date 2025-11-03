import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';

interface OnboardingSlideProps {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}

export const OnboardingSlide = ({ icon, title, description, children }: OnboardingSlideProps) => (
  <View style={styles.container}>
    <View style={styles.iconContainer}>{icon}</View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    {children && <View style={styles.footer}>{children}</View>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F0F3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: palette.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: fontSizes.md,
    textAlign: 'center',
    color: palette.mutedText,
    lineHeight: 22,
  },
  footer: {
    marginTop: 24,
    width: '100%',
  },
});
