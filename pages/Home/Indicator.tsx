import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { base } from '../../global/theme'
import { CARD_WIDTH } from './Home'

interface IndicatorProps {
  renderPages: Array<{}>
  scrollX: Animated.Value
}

const Indicator = ({ renderPages, scrollX }: IndicatorProps) => {
  return <View style={styles.indicatorContainer}>
    {renderPages.map((_, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        (index) * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
      ]
      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [1, 1.3, 1],
        extrapolate: 'clamp'
      })
      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.6, 1, 0.6],
        extrapolate: 'clamp'
      })
      return <Animated.View
        key={index}
        style={[
          styles.circle,
          {
            transform: [{ scale }],
            backgroundColor: base.accent,
            opacity
          }
        ]} />
    })}
  </View>
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    height: 8,
    width: 8,
    borderRadius: 50,
    marginHorizontal: 8,
  }
})


export default Indicator
