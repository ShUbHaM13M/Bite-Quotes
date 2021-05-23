import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Authors from '../pages/Author'
import AuthorInfo from '../pages/AuthorInfo'

const Stack = createStackNavigator()

const AuthorStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Authors" component={Authors} />
      <Stack.Screen name="Author-info" component={AuthorInfo} />
    </Stack.Navigator>
  )
}

export default AuthorStack