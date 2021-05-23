import React from 'react'
import { Share } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { primary } from '../../global/theme'
import { QuoteProp } from '../QuoteCard'
import AnimatedButton from './AnimatedButton'

interface Props {
  quote: QuoteProp
}

const ShareButton = ({ quote }: Props) => {

  async function onSharePressed() {
    try {
      const result = await Share.share({
        title: 'Quote',
        message: `"${quote.content}" \n- ${quote.author} \n\nsent using Bite Quotes`,
      });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AnimatedButton
      onPress={onSharePressed}
      extraStyles={{ backgroundColor: primary }}>
      <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
        <Path d="M18.6064 8.94922C20.2633 8.94922 21.6064 7.60607 21.6064 5.94922C21.6064 4.29236 20.2633 2.94922 18.6064 2.94922C16.9496 2.94922 15.6064 4.29236 15.6064 5.94922C15.6064 7.60607 16.9496 8.94922 18.6064 8.94922Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M6.60641 15.9492C8.26327 15.9492 9.60641 14.6061 9.60641 12.9492C9.60641 11.2924 8.26327 9.94922 6.60641 9.94922C4.94956 9.94922 3.60641 11.2924 3.60641 12.9492C3.60641 14.6061 4.94956 15.9492 6.60641 15.9492Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M18.6064 22.9492C20.2633 22.9492 21.6064 21.6061 21.6064 19.9492C21.6064 18.2924 20.2633 16.9492 18.6064 16.9492C16.9496 16.9492 15.6064 18.2924 15.6064 19.9492C15.6064 21.6061 16.9496 22.9492 18.6064 22.9492Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M9.19641 14.4592L16.0264 18.4392" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M16.0164 7.45923L9.19641 11.4392" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </Svg>
    </AnimatedButton>
  )
}

export default ShareButton
