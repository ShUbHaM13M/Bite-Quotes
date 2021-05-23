import { NavigationProp } from '@react-navigation/core'
import React from 'react'
import { Pressable } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import AnimatedButton from './AnimatedButton'

const BackButton = ({ navigation }: { navigation: any }) => {

  function onBackPress() {
    navigation.goBack()
  }

  return (
    <Pressable
      style={{
        height: 50,
        width: 50,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginLeft: 20
      }}
      onPress={onBackPress}>
      <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
        <Path d="M19.2127 12.1537H5.21266" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M12.2127 19.1537L5.21266 12.1537L12.2127 5.15369" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </Svg>

    </Pressable>
  )
}

export default BackButton
