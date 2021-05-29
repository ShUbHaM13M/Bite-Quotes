import React from 'react'
import { View, Animated } from 'react-native'
import BrowseCard from './BrowseCard'
import { CARD_WIDTH, SPACER_WIDTH_SIZE, CARD_HEIGHT } from './Home'

interface CardListProps {
  data: Array<{}>
  scrollX: Animated.Value
  onCardPress: (location: string) => void
}

const CardList = ({ data, scrollX, onCardPress }: CardListProps) => {

  return <Animated.FlatList
    scrollEventThrottle={16}
    contentContainerStyle={{ alignItems: 'center' }}
    showsHorizontalScrollIndicator={false}
    snapToInterval={CARD_WIDTH}
    decelerationRate={0}
    horizontal
    data={data}
    bounces={false}
    renderItem={({ item, index }: { item: any, index: number }) => {

      if (!item.name) {
        return <View style={{
          width: SPACER_WIDTH_SIZE
        }} />
      }

      const inputRange = [
        (index - 2) * CARD_WIDTH,
        (index - 1) * CARD_WIDTH,
        (index) * CARD_WIDTH
      ]

      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.85, 1, 0.85]
      })

      return <Animated.View style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        transform: [{ scale }]
      }}>
        <BrowseCard
          item={item}
          onPress={onCardPress} />
      </Animated.View>
    }}
    keyExtractor={(_, index) => index.toString()}
    onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      { useNativeDriver: true }
    )}
  />
}

export default CardList
