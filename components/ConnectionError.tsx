import React from 'react'
import { View, Text } from 'react-native'
import { base, dark } from '../global/theme'

const ConnectionError = () => {
  return (
    <View style={{
      width: '100%',
      justifyContent: 'center',
      bottom: 0,
      opacity: 0.9,
      alignItems: 'center',
      position: 'absolute',
      height: 80,
      backgroundColor: dark
    }}>
      <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
        <Text style={{ color: base.accent, fontSize: 20 }}>Connection Error </Text>{"\n"}
        You can still browse saved quotes.
      </Text>
    </View>
  )
}

export default ConnectionError
