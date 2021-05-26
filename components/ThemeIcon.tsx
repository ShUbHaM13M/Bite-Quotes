import React, { useEffect } from 'react'
import { Pressable } from 'react-native'
import Svg, { Defs, Path, Use } from 'react-native-svg'
import Animated, { Easing, interpolateColor, useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated"
import { interpolatePath, parse } from 'react-native-redash'
import { useTheme } from '../context/ThemeContext'
import theme, { base } from '../global/theme'

const AnimatedPath = Animated.createAnimatedComponent(Path);

const ThemeIcon = () => {

  const { currentTheme, setCurrentTheme }: any = useTheme()
  const value = useSharedValue(0)

  useEffect(() => {
    value.value = currentTheme === 'dark' ? 1 : 0
  }, [currentTheme])

  const transitionDuration = 350

  const moonPath = "M17.5 28C17.5 43.1878 28.5681 55.5 27.5 55.5C12.3122 55.5 0 43.1878 0 28C0 12.8122 12.3122 0.5 27.5 0.5C27.5 0.5 17.5 12.8122 17.5 28Z";
  const sunPath = "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z";

  const pathShape = [
    parse(sunPath),
    parse(moonPath)
  ]

  const animatedProps = useAnimatedProps(() => {
    const d = interpolatePath(value.value, [0, 1], pathShape);
    const fill = interpolateColor(value.value, [0, 1], ['#ffdf22', '#F5F3CE'])
    return { d, fill };
  })

  function changeTheme() {
    if (currentTheme === 'light') {
      value.value = withTiming(1, { duration: transitionDuration, easing: Easing.ease })
      setCurrentTheme('dark')
      return
    }
    value.value = withTiming(0, { duration: transitionDuration, easing: Easing.ease })
    setCurrentTheme('light')
  }

  return (
    <Pressable
      onPress={changeTheme}
      style={{
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `${base.accent}cc`,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: currentTheme === 'light'
          ? '#00000088'
          : '#FFFFFF88'
      }}>
      <Svg style={{ width: 36, height: 36 }} rotation={-45} viewBox="0 0 60 60" fill="none">
        <Use href="#icon" x="50%" y="50%" transform={{ translateX: -28, translateY: -28 }} />
        <Defs>
          <AnimatedPath id="icon" animatedProps={animatedProps} />
        </Defs>
      </Svg>
    </Pressable>
  )
}

export default ThemeIcon