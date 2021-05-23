import React, { ReactNode } from 'react'
import { View, Text, Pressable, StyleProp, ViewStyle } from 'react-native'
import { base } from '../../global/theme'

interface Props {
  children: ReactNode
  styles?: StyleProp<ViewStyle>
  onPress: () => void
}

const CustomPressable = ({ children, styles, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{
        backgroundColor: base.accent,
        opacity: pressed ? 0.8 : 1
      }, styles]} >
      {children}
    </Pressable>
  )
}

export default CustomPressable
