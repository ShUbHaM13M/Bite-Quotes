/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useRef } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import ThemeProvider, { useTheme } from './context/ThemeContext';
import globalStyles from './global/styles';
import RootStack from './navigators/RootNavigator';
import Header from './components/Header';

const App = () => {


  return (
    <SafeAreaView style={[globalStyles.fullHeight]}>
      <ThemeProvider>
        <NavigationContainer>
          <CustomStatusBar />
          <RootStack />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaView>
  );
};

const CustomStatusBar = () => {

  const { currentTheme }: any = useTheme()

  return <StatusBar
    backgroundColor={currentTheme?.value?.backgroundColor}
    barStyle={
      currentTheme?.name === 'light' ? 'dark-content' : 'light-content'
    }
  />
}

export default App;
