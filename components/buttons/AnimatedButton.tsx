import React from 'react'
import { View, Text, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { base } from '../../global/theme'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface Props {
  children: React.ReactNode
  onPress: () => void
  extraStyles?: StyleProp<ViewStyle>
}

const AnimatedButton = ({ children, onPress, extraStyles }: Props) => {

  const val = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(val.value, [0, 1], [1, 0.90])
    return {
      transform: [{ scale }]
    }
  })

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        val.value = withSpring(1)
      }}
      onPressOut={() => {
        val.value = withSpring(0)
      }}
      style={[
        styles.roundedButton,
        animatedStyles, {
          backgroundColor: base.accent
        }, extraStyles]}>
      {children}
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  roundedButton: {
    borderRadius: 100,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default AnimatedButton
