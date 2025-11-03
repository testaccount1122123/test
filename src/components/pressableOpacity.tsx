import { Pressable, PressableProps } from 'react-native';

export const PressableOpacity = ({ style, ...rest }: PressableProps) => (
  <Pressable
    accessibilityRole="button"
    {...rest}
    style={(state) => {
      const baseStyle = typeof style === 'function' ? style(state) : style;
      return [baseStyle, state.pressed && { opacity: 0.85 }];
    }}
  />
);
