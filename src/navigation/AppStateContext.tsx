import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AppState {
  hasOnboarded: boolean;
  isSubscribed: boolean;
  completeOnboarding: () => Promise<void>;
  activateSubscription: () => Promise<void>;
  reset: () => Promise<void>;
}

const STORAGE_KEYS = {
  onboarded: 'nutrisnap.onboarded',
  subscribed: 'nutrisnap.subscribed',
} as const;

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const [storedOnboarding, storedSubscription] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.onboarded),
          AsyncStorage.getItem(STORAGE_KEYS.subscribed),
        ]);
        setHasOnboarded(storedOnboarding === 'true');
        setIsSubscribed(storedSubscription === 'true');
      } catch (error) {
        console.warn('Failed to hydrate state', error);
      } finally {
        setIsHydrated(true);
      }
    };
    hydrate();
  }, []);

  const completeOnboarding = async () => {
    setHasOnboarded(true);
    await AsyncStorage.setItem(STORAGE_KEYS.onboarded, 'true');
  };

  const activateSubscription = async () => {
    setIsSubscribed(true);
    await AsyncStorage.setItem(STORAGE_KEYS.subscribed, 'true');
  };

  const reset = async () => {
    setHasOnboarded(false);
    setIsSubscribed(false);
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  };

  const value = useMemo(
    () => ({ hasOnboarded, isSubscribed, completeOnboarding, activateSubscription, reset }),
    [hasOnboarded, isSubscribed]
  );

  if (!isHydrated) {
    return <></>;
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};
