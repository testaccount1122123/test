import { ReactNode, createContext, useContext } from 'react';
import { NutritionBreakdown, useNutritionAnalyzer } from '@/hooks/useNutritionAnalyzer';

interface NutritionState {
  items: NutritionBreakdown[];
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  isAnalyzing: boolean;
  error: string | null;
  pickImage: () => Promise<void>;
  takePhoto: () => Promise<void>;
}

const NutritionContext = createContext<NutritionState | undefined>(undefined);

export const NutritionProvider = ({ children }: { children: ReactNode }) => {
  const value = useNutritionAnalyzer();
  return <NutritionContext.Provider value={value}>{children}</NutritionContext.Provider>;
};

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within NutritionProvider');
  }
  return context;
};
