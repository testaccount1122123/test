import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';
import { PressableOpacity } from './pressableOpacity';

interface SegmentedControlProps<T extends string> {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}

export const SegmentedControl = <T extends string>({ options, value, onChange }: SegmentedControlProps<T>) => {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <PressableOpacity
            key={option.value}
            style={[styles.option, isActive && styles.optionActive]}
            onPress={() => onChange(option.value)}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>{option.label}</Text>
          </PressableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: palette.inputBackground,
    borderRadius: 16,
    padding: 6,
    marginVertical: 12,
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: palette.surface,
    shadowColor: '#1F2A6B',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  label: {
    color: palette.mutedText,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
  labelActive: {
    color: palette.text,
  },
});
