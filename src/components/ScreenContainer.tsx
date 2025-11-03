import { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { palette } from '@/theme/colors';

export const ScreenContainer = ({ children }: { children: ReactNode }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>{children}</View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 0,
  },
});
