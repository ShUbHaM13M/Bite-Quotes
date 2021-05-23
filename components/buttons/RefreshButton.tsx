import React from 'react'
import { View, Text } from 'react-native'
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'
import AnimatedButton from './AnimatedButton'

const RefreshButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <AnimatedButton
      onPress={onPress}
      extraStyles={{
        marginTop: 30,
      }}>
      <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <Path d="M24 5V11H18" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M2 21V15H8" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M4.51 10C5.01717 8.56678 5.87913 7.2854 7.01547 6.27542C8.1518 5.26543 9.52547 4.55976 11.0083 4.22426C12.4911 3.88875 14.0348 3.93434 15.4952 4.35677C16.9556 4.77921 18.2853 5.56471 19.36 6.64L24 11M2 15L6.64 19.36C7.71475 20.4353 9.04437 21.2208 10.5048 21.6432C11.9652 22.0657 13.5089 22.1112 14.9917 21.7757C16.4745 21.4402 17.8482 20.7346 18.9845 19.7246C20.1209 18.7146 20.9828 17.4332 21.49 16" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </Svg>

    </AnimatedButton>
  )
}

export default RefreshButton
