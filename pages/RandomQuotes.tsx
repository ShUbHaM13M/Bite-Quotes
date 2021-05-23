import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import Animated, { Easing, Extrapolate, interpolate, runOnJS, runOnUI, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import RandomButton from '../components/buttons/RandomButton'
import ExpandableQuoteCard from '../components/ExpandableQuoteCard'
import { QuoteProp } from '../components/QuoteCard'
import TagsList from '../components/TagsList'
import Toaster from '../components/Toaster'
import SavedQuotesProvider from '../context/SavedQuotesContext'
import { useTheme } from '../context/ThemeContext'
import { Heading } from '../global/styles'
import { base, randomQuoteColors } from '../global/theme'
import rootUrl from '../rootUrl'

const RandomQuotes = ({ navigation }: any) => {

  const { currentTheme }: any = useTheme()
  const backgroundColor = currentTheme?.name === 'light'
    ? randomQuoteColors.color
    : randomQuoteColors.dark

  const [quote, setQuote] = useState<QuoteProp | null>()
  const [fetchAgain, setFetchAgain] = useState(false)
  const anim = useSharedValue(1)
  const animationConfig = {
    duration: 350,
    easing: Easing.ease
  }
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(anim.value, [0, 1], [0, 1], Extrapolate.CLAMP)
    return { opacity }
  })

  function onRandomPressed() {
    setFetchAgain(prev => !prev)
  }

  const fetchRandomQuote = useCallback(async () => {
    try {
      const response = await fetch(`${rootUrl}random`)
      const data = await response.json();
      if (response.ok)
        setQuote(data)
      anim.value = withTiming(1, animationConfig)
    } catch (err) {
      console.log(err)
    }
  }, [fetchAgain])

  useEffect(() => {
    anim.value = withTiming(0, animationConfig,
      () => { runOnJS(fetchRandomQuote)() }
    )
  }, [fetchAgain])

  return (
    <SavedQuotesProvider>
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor
      }}>
        <Heading size='30px' textCenter marginBottom='10px'>Random Quotes</Heading>

        {quote &&
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{ width: '100%' }}>
              <TagsList navigation={navigation} tags={quote ? quote.tags : []} />
            </View>
            <Animated.View style={animatedStyle}>
              <ExpandableQuoteCard {...quote} />
            </Animated.View>
            <RandomButton onPress={onRandomPressed} />
          </View>
        }
        <Toaster text="Try long pressing the Quote!" width={250} />
      </View>
    </SavedQuotesProvider>
  )
}

export default RandomQuotes

