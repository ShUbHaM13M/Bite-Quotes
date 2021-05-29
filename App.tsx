/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import ThemeProvider, { useTheme } from './context/ThemeContext';
import RootStack from './navigators/RootNavigator';
import AnimatedSplash from 'react-native-animated-splash-screen'
import SplashScreen from 'react-native-splash-screen'
import { dark, primary } from './global/theme';

const App = () => {

  const [loaded, setLoaded] = useState(false)
  const isHermes = () => !!global.HermesInternal;

  useEffect(() => {
    SplashScreen.hide()
    console.log(isHermes())
  }, [])

  return (
    <AnimatedSplash
      isLoaded={loaded}
      logoImage={require("./assets/images/SplashLogo.png")}
      backgroundColor="#DFE2D1"
      logoHeight={80}
      logoWidth={80}>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemeProvider>
          <NavigationContainer>
            <CustomStatusBar hidden={!loaded} />
            <RootStack setLoaded={setLoaded} />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaView>
    </AnimatedSplash>
  );
};

const CustomStatusBar = ({ hidden }: { hidden: boolean }) => {

  const { currentTheme }: any = useTheme()

  return <StatusBar
    hidden={hidden}
    translucent
    backgroundColor={currentTheme === 'light' ? primary : dark}
    barStyle={
      currentTheme === 'light' ? 'dark-content' : 'light-content'
    }
  />
}

export default App;
