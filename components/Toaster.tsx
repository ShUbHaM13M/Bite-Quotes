import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import styled from 'styled-components'
import { base } from '../global/theme'

interface Props {
  text: string,
  width: number,
}

const { height: sHeight } = Dimensions.get('window')

const Toaster = ({ text, width = 250 }: Props) => {

  const opacity = useSharedValue(1)

  const animatedStyles = useAnimatedStyle(() => {
    const opacityValue = interpolate(opacity.value, [0, 1], [0, 1])
    return { opacity: opacityValue }
  })

  useEffect(() => {
    opacity.value = withTiming(0, {
      duration: 2000,
      easing: Easing.ease
    })
  }, [])

  return (
    <Animated.View style={[
      styles.container,
      animatedStyles,
      {
        width,
        transform: [
          { translateX: width / 2 },
          { translateX: -width / 2 }
        ]
      }
    ]}
      pointerEvents='none'>
      <Text style={{
        textAlign: 'center',
      }}>{text}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: base.accent2,
    padding: 15,
    borderRadius: 100,
    position: 'absolute',
    bottom: sHeight * 0.1,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 1
  }
})

export default Toaster
