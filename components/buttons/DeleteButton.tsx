import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { SavedQuotesContext } from '../../context/SavedQuotesContext'
import AnimatedButton from './AnimatedButton'

interface Props {
  onPress: () => void
}

const DeleteButton = ({ onPress }: Props) => {

  return (
    <AnimatedButton onPress={onPress}>
      <Svg width="21" height="23" viewBox="0 0 21 23" fill="none">
        <Path d="M1.23535 5.47946H3.23535H19.2354" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M6.23535 5.47946V3.47946C6.23535 2.94903 6.44607 2.44032 6.82114 2.06525C7.19621 1.69018 7.70492 1.47946 8.23535 1.47946H12.2354C12.7658 1.47946 13.2745 1.69018 13.6496 2.06525C14.0246 2.44032 14.2354 2.94903 14.2354 3.47946V5.47946M17.2354 5.47946V19.4795C17.2354 20.0099 17.0246 20.5186 16.6496 20.8937C16.2745 21.2687 15.7658 21.4795 15.2354 21.4795H5.23535C4.70492 21.4795 4.19621 21.2687 3.82114 20.8937C3.44607 20.5186 3.23535 20.0099 3.23535 19.4795V5.47946H17.2354Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M8.23535 10.4795V16.4795" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M12.2354 10.4795V16.4795" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </Svg>
    </AnimatedButton>
  )
}

export default DeleteButton
