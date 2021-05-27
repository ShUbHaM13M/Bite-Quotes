import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Card, Heading } from '../global/styles'
import RefreshButton from './buttons/RefreshButton'
import QuoteCard, { CARD_HEIGHT, CARD_WIDTH, QuoteProp } from './QuoteCard'

interface Props {
  render: boolean
  setTags?: React.Dispatch<React.SetStateAction<(string)[] | undefined>>
  toggleRender: React.Dispatch<React.SetStateAction<boolean>>
  data: Array<QuoteProp>,
  fetchMore: () => void,
  backgroundColor: string
}

const TinderSwipe = ({ data, fetchMore, render, toggleRender, setTags, backgroundColor }: Props) => {

  const useSwiper = useRef(null).current
  const handleOnSwipeLeft = () => useSwiper.swipeLeft()
  const handleOnSwipeRight = () => useSwiper.swipeRight()

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }}>
      {render &&
        <Swiper
          cards={data}
          onSwiped={index => setTags && setTags(data[index].tags)}
          animateCardOpacity
          renderCard={card => card?.content
            ? <View style={{ alignSelf: 'center' }}>
              <QuoteCard {...card} />
            </View>
            : null
          }
          showSecondCard={true}
          onSwipedAll={() => {
            setTags && setTags(undefined);
            toggleRender(false)
          }}
          childrenOnTop
          stackSize={2}
          disableBottomSwipe
          disableTopSwipe
          backgroundColor={backgroundColor}
        />
      }
      {!render &&
        <Card
          width={`${CARD_WIDTH * 0.9}px`}
          height={`${CARD_HEIGHT * 0.9}px`}
          borderRadius='20px' >
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Heading>More Quotes ?</Heading>
            <RefreshButton onPress={() => {
              fetchMore()
            }} />
          </View>
        </Card>
      }
    </View>
  )
}

export default TinderSwipe
