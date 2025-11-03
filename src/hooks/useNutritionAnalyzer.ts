import { useCallback, useMemo, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export type NutritionBreakdown = {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  detectedFood?: string;
  timestamp: number;
  imageUri: string;
};

const fallbackFoods = [
  { name: 'Grilled Chicken Salad', calories: 420, protein: 38, carbs: 20, fats: 18 },
  { name: 'Avocado Toast', calories: 320, protein: 8, carbs: 34, fats: 18 },
  { name: 'Berry Smoothie', calories: 210, protein: 12, carbs: 36, fats: 4 },
  { name: 'Protein Bowl', calories: 560, protein: 42, carbs: 48, fats: 18 },
];

export const useNutritionAnalyzer = () => {
  const [items, setItems] = useState<NutritionBreakdown[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = useCallback(async () => {
    setError(null);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setError('Permission to access the photo library is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]) {
      await analyzeImage(result.assets[0].uri);
    }
  }, []);

  const takePhoto = useCallback(async () => {
    setError(null);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      setError('Camera access is required to capture food photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]) {
      await analyzeImage(result.assets[0].uri);
    }
  }, []);

  const analyzeImage = useCallback(async (uri: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const randomFood = fallbackFoods[Math.floor(Math.random() * fallbackFoods.length)];
      const timestamp = Date.now();
      const breakdown: NutritionBreakdown = {
        ...randomFood,
        detectedFood: randomFood.name,
        timestamp,
        imageUri: uri,
      };
      setItems((prev) => [breakdown, ...prev].slice(0, 10));
    } catch (err) {
      console.error(err);
      setError('Something went wrong while analyzing the image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const totals = useMemo(() => {
    return items.reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fats: acc.fats + item.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [items]);

  return {
    items,
    totals,
    isAnalyzing,
    error,
    pickImage,
    takePhoto,
  };
};
