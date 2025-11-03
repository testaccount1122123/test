export const formatCalories = (value: number) => `${Math.round(value)} kcal`;
export const formatMacro = (value: number, unit: 'g' | 'cal' = 'g') => `${Math.round(value)} ${unit}`;
