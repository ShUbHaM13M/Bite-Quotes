import React, { PureComponent } from 'react'
import { Animated, Pressable, StyleSheet, Text, View, } from 'react-native'
import { Heading } from '../../global/styles'
import { base } from '../../global/theme'
import { authorProps, CARD_HEIGHT, SPACING } from '../Author/Author'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export class AuthorCard extends PureComponent {

  item: authorProps
  opacity: Animated.AnimatedInterpolation
  scale: Animated.AnimatedInterpolation
  onPress: (item: authorProps) => void

  constructor(props: {
    item: authorProps,
    scale: Animated.AnimatedInterpolation,
    opacity: Animated.AnimatedInterpolation,
    onPress: () => void
  }) {
    super(props)
    this.item = props.item
    this.scale = props.scale
    this.opacity = props.opacity
    this.onPress = props.onPress
  }

  render() {
    return (
      <AnimatedPressable
        style={[
          styles.authorCard, {
            transform: [{ scale: this.scale }],
            opacity: this.opacity,
          }
        ]}
        onPress={() =>
          this.onPress(this.item)
        }>
        <Heading>{this.item.name}</Heading>
        <View style={{
          height: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          width: '100%',
          marginVertical: 10
        }} />
        <Text style={{ fontSize: 18 }}>{this.item.description}</Text>
      </AnimatedPressable>
    )
  }
}

const styles = StyleSheet.create({
  authorCard: {
    elevation: 1,
    height: 150,
    marginBottom: 20,
    backgroundColor: base.accent2,
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)'
  }
})

export default AuthorCard
