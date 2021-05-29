import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import RandomButton from '../../components/buttons/RandomButton'
import ExpandableQuoteCard from './ExpandableQuoteCard'
import { QuoteProp } from '../../components/QuoteCard'
import TagsList from '../../components/TagsList'
import SavedQuotesProvider from '../../context/SavedQuotesContext'
import { useTheme } from '../../context/ThemeContext'
import { Heading } from '../../global/styles'
import { dark, primary, randomQuoteColors } from '../../global/theme'
import useFetch from '../../utils/useFetch'

const RandomQuotes = ({ navigation }: any) => {

  const { currentTheme }: any = useTheme()
  const backgroundColor = currentTheme === 'dark'
    ? dark : primary
  const textColor = currentTheme === 'dark' ? primary : dark

  const [quote, setQuote] = useState<QuoteProp | null>()
  const [loading, setLoading] = useState<boolean>(true)
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

  const fetchRandomQuote = useCallback(() => {
    useFetch('random')
      .then(data => {
        if (data) {
          setQuote(data)
          anim.value = withTiming(1, animationConfig)
        }
      })
      .catch(error => console.log(error))
  }, [fetchAgain])

  useEffect(() => {
    anim.value = withTiming(0, animationConfig,
      () => { runOnJS(fetchRandomQuote)() }
    )
    setLoading(false)
  }, [fetchAgain])

  return (
    <SavedQuotesProvider>
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor
      }}>
        <View style={{
          backgroundColor,
          width: '100%',
          justifyContent: 'center',
          alignSelf: 'stretch',
          elevation: 2
        }} >
          <Heading
            size={30}
            marginTop={40}
            textCenter
            color={textColor}
            marginBottom={10}>Random Quotes</Heading>
        </View>

        {!loading && quote &&
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{ width: '100%', marginTop: 10 }}>
              <TagsList navigation={navigation} tags={quote ? quote.tags : []} />
            </View>
            <Animated.View style={animatedStyle}>
              <ExpandableQuoteCard {...quote} />
            </Animated.View>
            <RandomButton onPress={onRandomPressed} />
          </View>
        }
      </View>
    </SavedQuotesProvider>
  )
}

export default RandomQuotes

