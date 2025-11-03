import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';

interface GradientButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  startColor?: string;
  endColor?: string;
  leftAccessory?: ReactNode;
}

export const GradientButton = ({
  label,
  onPress,
  disabled,
  startColor = '#6A73F9',
  endColor = '#9A7CFF',
  leftAccessory,
}: GradientButtonProps) => (
  <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.wrapper, pressed && styles.pressed, disabled && styles.disabled]}>
    <LinearGradient colors={[startColor, endColor]} style={styles.gradient}>
      {leftAccessory}
      <Text style={styles.label}>{label}</Text>
    </LinearGradient>
  </Pressable>
);

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 12,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    paddingVertical: 16,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 8,
  },
  label: {
    color: palette.surface,
    fontSize: fontSizes.md,
    fontWeight: '700',
  },
});
