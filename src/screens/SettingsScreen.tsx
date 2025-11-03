import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';
import { useState } from 'react';
import { PressableOpacity } from '@/components/pressableOpacity';
import { useAppState } from '@/navigation/AppStateContext';

const goalItems = [
  { label: 'Daily Calorie Goal', value: '2000 cal' },
  { label: 'Protein Goal', value: '150g' },
  { label: 'Carbs Goal', value: '200g' },
  { label: 'Fats Goal', value: '65g' },
  { label: 'Weight Goal', value: '70 lbs' },
];

const accountItems = [
  { label: 'Profile', value: 'Edit' },
  { label: 'Notifications', toggle: true },
  { label: 'Subscription', value: 'Premium' },
];

const supportItems = [
  { label: 'Help & Support' },
  { label: 'Log Out', destructive: true },
];

export const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { reset } = useAppState();

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goals</Text>
          {goalItems.map((item) => (
            <Row key={item.label} label={item.label} value={item.value} />
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {accountItems.map((item) => (
            <Row
              key={item.label}
              label={item.label}
              value={item.value}
              toggle={item.toggle}
              toggleValue={notificationsEnabled}
              onToggle={setNotificationsEnabled}
            />
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {supportItems.map((item) => (
            <Row
              key={item.label}
              label={item.label}
              destructive={item.destructive}
              onPress={item.destructive ? reset : undefined}
            />
          ))}
        </View>
        <Text style={styles.footerText}>NutriSnap v1.0.0</Text>
      </ScrollView>
    </ScreenContainer>
  );
};

interface RowProps {
  label: string;
  value?: string;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  destructive?: boolean;
  onPress?: () => void;
}

const Row = ({ label, value, toggle, toggleValue, onToggle, destructive, onPress }: RowProps) => (
  <PressableOpacity onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
    <View>
      <Text style={[styles.rowLabel, destructive && styles.destructive]}>{label}</Text>
      {value && <Text style={styles.rowValue}>{value}</Text>}
    </View>
    {toggle ? (
      <Switch
        value={toggleValue}
        onValueChange={(val) => onToggle?.(val)}
        trackColor={{ true: palette.primary, false: palette.border }}
        thumbColor={palette.surface}
      />
    ) : null}
  </PressableOpacity>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: palette.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowPressed: {
    opacity: 0.85,
  },
  rowLabel: {
    fontSize: fontSizes.md,
    color: palette.text,
    fontWeight: '600',
  },
  rowValue: {
    marginTop: 4,
    color: palette.mutedText,
  },
  destructive: {
    color: '#FF5A5F',
  },
  footerText: {
    textAlign: 'center',
    color: palette.mutedText,
    marginTop: 12,
  },
});
