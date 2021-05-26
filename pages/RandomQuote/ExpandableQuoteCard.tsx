import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, Dimensions, Pressable, StatusBar } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { useTheme } from '../../context/ThemeContext'
import { AuthorText, Card, Heading } from '../../global/styles'
import { base, dark, primary } from '../../global/theme'
import { SavedQuotesContext } from '../../context/SavedQuotesContext'
import LikeButton from '../../components/buttons/LikeButton'
import ShareButton from '../../components/buttons/ShareButton'
import { CARD_HEIGHT, CARD_WIDTH, QuoteProp } from '../../components/QuoteCard'
import { getSavedQuotesFromStorage } from '../../utils/useStorage'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const { width: sWidth, height: sHeight } = Dimensions.get('screen')

const ExpandableQuoteCard = (quote: QuoteProp) => {

  const { currentTheme }: any = useTheme()
  const scale = useSharedValue(0)
  const scaleDown = useSharedValue(0)
  const [cardFullView, setCardFullView] = useState(false)
  const [isScaleDown, setIsScaleDown] = useState(false)
  const [statusbarColor, setStatusbarColor] = useState(currentTheme === 'dark' ? dark : primary)

  const styles = useAnimatedStyle(() => {
    const width = interpolate(scale.value, [0, 1], [CARD_WIDTH, sWidth])
    const height = interpolate(scale.value, [0, 1], [CARD_HEIGHT, sHeight])
    const borderRadius = interpolate(scale.value, [0, 1], [20, 0])
    const scaleAmount = interpolate(scaleDown.value, [0, 1], [1, 0.95])
    return {
      width,
      height,
      overflow: 'hidden',
      paddingVertical: 30,
      backgroundColor: base.accent2,
      borderRadius,
      marginVertical: 20,
      transform: [{ scale: scaleAmount }]
    }
  })

  const actionStyles = useAnimatedStyle(() => {
    const marginBottom = interpolate(scale.value, [0, 1], [0, 50])
    return {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
      width: '100%',
      marginBottom
    }
  })

  const headingContainerStyles = useAnimatedStyle(() => {
    const translateY = interpolate(scale.value, [0, 1], [0, 100])
    const paddingHorizontal = interpolate(scale.value, [0, 1], [0, 10])
    return { transform: [{ translateY: translateY }], paddingHorizontal }
  })

  const { saveQuote } = useContext(SavedQuotesContext)

  function onLikeButtonPressed() {
    saveQuote(quote)
  }

  useEffect(() => {
    scale.value = withTiming(cardFullView ? 1 : 0, {
      duration: 300
    })
    setStatusbarColor(cardFullView
      ? base.accent2
      : currentTheme === 'dark' ? dark : primary
    )
  }, [cardFullView])

  useEffect(() => {
    scaleDown.value = withSpring(isScaleDown ? 1 : 0)
  }, [isScaleDown])

  return (
    <AnimatedPressable
      style={[styles]}
      onPressIn={() => cardFullView ? '' : setIsScaleDown(true)}
      onPressOut={() => setIsScaleDown(false)}
      onLongPress={() => {
        setIsScaleDown(false)
        setCardFullView(!cardFullView)
      }}>
      <StatusBar backgroundColor={statusbarColor} />
      <Card flex={1}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ marginTop: 10, width: '100%' }}>
          <Animated.View style={[headingContainerStyles]}>
            <Heading textCenter size={26} color={dark}>{quote.content}</Heading>
          </Animated.View>
        </ScrollView>
        <AuthorText>- {quote.author}</AuthorText>
        <Animated.View style={actionStyles}>
          <ShareButton quote={quote} />
          <LikeButton quoteId={quote._id} onPress={onLikeButtonPressed} />
        </Animated.View>
      </Card>
    </AnimatedPressable>
  )
}

export default ExpandableQuoteCard
