import { useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ScreenContainer';
import { OnboardingSlide } from '@/components/OnboardingSlide';
import { GradientButton } from '@/components/GradientButton';
import { palette } from '@/theme/colors';
import { fontSizes } from '@/theme/typography';
import { PressableOpacity } from '@/components/pressableOpacity';
import { useAppState } from '@/navigation/AppStateContext';

const { width } = Dimensions.get('window');

const goals = ['Lose Weight', 'Maintain Weight', 'Gain Muscle', 'Stay Healthy'] as const;
const activityLevels = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'] as const;

export const OnboardingScreen = () => {
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<typeof goals[number]>('Lose Weight');
  const [activityLevel, setActivityLevel] = useState<typeof activityLevels[number]>('Moderately Active');
  const [calorieTarget, setCalorieTarget] = useState(1900);
  const { completeOnboarding } = useAppState();

  const slides = useMemo(
    () => [
      {
        key: 'intro',
        title: 'Calorie tracking made easy with AI',
        description: 'Just snap a picture of your food and let AI do the rest. Get instant nutrition info.',
        icon: <Feather name="flame" size={32} color={palette.accent} />,
      },
      {
        key: 'camera',
        title: 'Just snap a picture of your food',
        description: 'Our AI identifies ingredients and calculates calories, protein, carbs, and fats automatically.',
        icon: <Feather name="camera" size={32} color={palette.primary} />,
      },
      {
        key: 'goal',
        title: "What's your goal?",
        description: 'Select your primary fitness goal',
        icon: <Feather name="droplet" size={32} color={palette.primary} />,
        content: (
          <View style={styles.optionGroup}>
            {goals.map((goal) => {
              const isActive = goal === selectedGoal;
              return (
                <PressableOpacity
                  key={goal}
                  style={[styles.selectionButton, isActive && styles.selectionButtonActive]}
                  onPress={() => setSelectedGoal(goal)}
                >
                  <Text style={[styles.selectionLabel, isActive && styles.selectionLabelActive]}>{goal}</Text>
                </PressableOpacity>
              );
            })}
          </View>
        ),
      },
      {
        key: 'activity',
        title: 'Activity Level',
        description: 'How active are you?',
        icon: <Feather name="minus" size={32} color={palette.primary} />,
        content: (
          <View style={styles.optionGroup}>
            {activityLevels.map((level) => {
              const isActive = level === activityLevel;
              return (
                <PressableOpacity
                  key={level}
                  style={[styles.selectionButton, isActive && styles.selectionButtonActive]}
                  onPress={() => setActivityLevel(level)}
                >
                  <Text style={[styles.selectionLabel, isActive && styles.selectionLabelActive]}>{level}</Text>
                </PressableOpacity>
              );
            })}
          </View>
        ),
      },
      {
        key: 'calories',
        title: 'Daily Calorie Goal',
        description: 'What is your daily calorie goal?',
        icon: <Feather name="bookmark" size={32} color={palette.primary} />,
        content: (
          <View style={styles.calorieSelector}>
            <PressableOpacity
              onPress={() => setCalorieTarget((value) => Math.max(1200, value - 100))}
              style={styles.adjustButton}
            >
              <Feather name="minus" size={20} color={palette.primary} />
            </PressableOpacity>
            <View style={styles.calorieValueContainer}>
              <Text style={styles.calorieValue}>{calorieTarget}</Text>
              <Text style={styles.calorieUnit}>calories</Text>
            </View>
            <PressableOpacity onPress={() => setCalorieTarget((value) => value + 100)} style={styles.adjustButton}>
              <Feather name="plus" size={20} color={palette.primary} />
            </PressableOpacity>
          </View>
        ),
      },
      {
        key: 'summary',
        title: 'Track your progress over time',
        description: 'See your daily streak, monitor your weight, and achieve your goals with detailed insights.',
        icon: <Feather name="trending-up" size={32} color={palette.primary} />,
      },
    ],
    [activityLevel, calorieTarget, selectedGoal]
  );

  const next = async () => {
    if (index === slides.length - 1) {
      await completeOnboarding();
      return;
    }
    const nextIndex = index + 1;
    setIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  const renderItem = ({ item }: { item: (typeof slides)[number] }) => (
    <View style={{ width }}>
      <OnboardingSlide icon={item.icon} title={item.title} description={item.description}>
        {item.content}
      </OnboardingSlide>
    </View>
  );

  return (
    <ScreenContainer>
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        scrollEnabled={false}
      />
      <View style={styles.progressDots}>
        {slides.map((slide, dotIndex) => (
          <View key={slide.key} style={[styles.dot, dotIndex === index && styles.dotActive]} />
        ))}
      </View>
      <GradientButton label={index === slides.length - 1 ? 'Get Started' : 'Continue'} onPress={next} />
      <Text style={styles.helperText}>
        Goal: {selectedGoal} · Activity: {activityLevel} · Target: {calorieTarget} kcal
      </Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D0D8F9',
  },
  dotActive: {
    backgroundColor: palette.primary,
  },
  helperText: {
    marginTop: 12,
    textAlign: 'center',
    color: palette.mutedText,
    fontSize: fontSizes.sm,
  },
  optionGroup: {
    width: '100%',
    gap: 12,
  },
  selectionButton: {
    backgroundColor: '#E7ECFF',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectionButtonActive: {
    backgroundColor: palette.surface,
    borderColor: palette.primary,
    shadowColor: '#1F2A6B',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  selectionLabel: {
    textAlign: 'center',
    fontSize: fontSizes.md,
    fontWeight: '600',
    color: palette.mutedText,
  },
  selectionLabelActive: {
    color: palette.text,
  },
  calorieSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
  },
  calorieValueContainer: {
    alignItems: 'center',
    gap: 4,
  },
  calorieValue: {
    fontSize: 42,
    fontWeight: '700',
    color: palette.text,
  },
  calorieUnit: {
    fontSize: fontSizes.sm,
    color: palette.mutedText,
  },
  adjustButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E7ECFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
