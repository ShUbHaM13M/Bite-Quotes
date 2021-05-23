import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Pressable } from 'react-native';
import Animated, { Easing, Extrapolate, interpolate, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg'
import { SavedQuotesContext } from '../../context/SavedQuotesContext';
import { RoundedButton } from '../../global/styles'
import { isQuoteInStorage, useStorage } from '../../utils/useStorage';
import { QuoteProp } from '../QuoteCard';
import AnimatedButton from './AnimatedButton';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

interface Props {
  quoteId: string
  onPress: () => void
}

const LikeButton = ({ quoteId, onPress }: Props) => {

  const [liked, setLiked] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [showIndicator, setShowIndicator] = useState<boolean>(true)

  const { isQuoteInStorage } = useContext(SavedQuotesContext)

  useEffect(() => {
    setLiked(isQuoteInStorage(quoteId) ? 1 : 0)
    setShowIndicator(false)
  }, [quoteId])

  function handlePress() {
    setLiked(prev => prev ? 0 : 1)
    onPress()
  }

  return (
    <AnimatedButton onPress={handlePress}>

      {showIndicator && <ActivityIndicator size='small' color='white' />}

      {!showIndicator && !loading &&
        <Svg width="25" height="25" viewBox="0 0 25 25" fill="#fff" fillOpacity={liked} >
          <G clip-path="url(#clip0)">
            <Path d="M21.2207 4.99064C20.7099 4.47964 20.1035 4.07429 19.436 3.79772C18.7686 3.52116 18.0532 3.37881 17.3307 3.37881C16.6082 3.37881 15.8928 3.52116 15.2253 3.79772C14.5579 4.07429 13.9514 4.47964 13.4407 4.99064L12.3807 6.05064L11.3207 4.99064C10.289 3.95895 8.88971 3.37935 7.43067 3.37935C5.97164 3.37935 4.57237 3.95895 3.54067 4.99064C2.50898 6.02233 1.92938 7.42161 1.92938 8.88064C1.92938 10.3397 2.50898 11.7389 3.54067 12.7706L4.60067 13.8306L12.3807 21.6106L20.1607 13.8306L21.2207 12.7706C21.7317 12.2599 22.137 11.6535 22.4136 10.986C22.6901 10.3185 22.8325 9.60313 22.8325 8.88064C22.8325 8.15815 22.6901 7.44274 22.4136 6.77529C22.137 6.10783 21.7317 5.5014 21.2207 4.99064Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </G>
          <Defs>
            <ClipPath id="clip0">
              <Rect width="24" height="24" fill="white" transform="translate(0.380676 0.380646)" />
            </ClipPath>
          </Defs>
        </Svg>
      }
    </AnimatedButton>
  )
}

export default LikeButton
