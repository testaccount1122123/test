import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { palette } from '@/theme/colors';
import { HomeScreen } from '@/screens/HomeScreen';
import { ProgressScreen } from '@/screens/ProgressScreen';
import { MealsScreen } from '@/screens/MealsScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { CameraScreen } from '@/screens/CameraScreen';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { PaywallScreen } from '@/screens/PaywallScreen';
import { useAppState } from './AppStateContext';
import { View } from 'react-native';

export type RootStackParamList = {
  Onboarding: undefined;
  Paywall: undefined;
  AppTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

const TAB_ICON: Record<string, keyof typeof Feather.glyphMap> = {
  Home: 'home',
  Progress: 'bar-chart-2',
  Camera: 'camera',
  Meals: 'layers',
  Settings: 'settings',
};

const TabNavigator = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: palette.primary,
      tabBarInactiveTintColor: palette.mutedText,
      tabBarStyle: {
        backgroundColor: palette.surface,
        borderTopWidth: 0,
        paddingTop: 12,
        paddingBottom: 12,
        height: 88,
      },
      tabBarIcon: ({ color, size }) => {
        const icon = TAB_ICON[route.name];
        return <Feather name={icon} size={size} color={color} />;
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
    })}
  >
    <Tabs.Screen name="Home" component={HomeScreen} />
    <Tabs.Screen name="Progress" component={ProgressScreen} />
    <Tabs.Screen
      name="Camera"
      component={CameraScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <View
            style={{
              backgroundColor: palette.primary,
              padding: 16,
              borderRadius: 24,
              marginBottom: 12,
            }}
          >
            <Feather name="camera" size={22} color={palette.surface} />
          </View>
        ),
        tabBarLabel: 'Snap',
      }}
    />
    <Tabs.Screen name="Meals" component={MealsScreen} />
    <Tabs.Screen name="Settings" component={SettingsScreen} />
  </Tabs.Navigator>
);

export const RootNavigator = () => {
  const { hasOnboarded, isSubscribed } = useAppState();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !isSubscribed ? (
          <Stack.Screen name="Paywall" component={PaywallScreen} />
        ) : (
          <Stack.Screen name="AppTabs" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
