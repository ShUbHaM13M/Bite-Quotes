import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import SavedQuotes from '../pages/SavedQuote/SavedQuotes';
import ExpandedSaveQuote from '../pages/SavedQuote/ExpandedSaveQuote';
import SavedQuotesProvider from '../context/SavedQuotesContext';

const Stack = createStackNavigator()

const SavedQuoteStack = () => {
  return <SavedQuotesProvider>
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='SavedQuotes' component={SavedQuotes} />
      <Stack.Screen name='ExpandedSaveQuote' component={ExpandedSaveQuote} />
    </Stack.Navigator>
  </SavedQuotesProvider>
}

export default SavedQuoteStack