import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from '@/navigation/RootNavigator';
import { AppStateProvider } from '@/navigation/AppStateContext';
import { NutritionProvider } from '@/navigation/NutritionContext';
import { View } from 'react-native';
import Constants from 'expo-constants';
import { palette } from '@/theme/colors';

export default function App() {
  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight, backgroundColor: palette.background }}>
      <AppStateProvider>
        <NutritionProvider>
          <RootNavigator />
        </NutritionProvider>
      </AppStateProvider>
      <StatusBar style="dark" />
    </View>
  );
}
