import { useNetInfo } from '@react-native-community/netinfo';
import React, { useRef } from 'react';
import { Animated, View, Dimensions } from 'react-native';
import ConnectionError from '../../components/ConnectionError';
import Header from '../../components/Header';
import { useTheme } from '../../context/ThemeContext';
import { dark, primary } from '../../global/theme';
import pages from '../pageInfo';
import Indicator from './Indicator';
import CardList from './CardList';

const { width, height } = Dimensions.get('window')
export const CARD_WIDTH = width * 0.8
export const SPACER_WIDTH_SIZE = (width - CARD_WIDTH) / 2
export const CARD_HEIGHT = height * 0.65

const Home = ({ navigation }: any) => {

  const { currentTheme }: any = useTheme();
  const textColor = currentTheme === 'dark' ? primary : dark
  const backgroundColor = currentTheme === 'dark' ? dark : primary

  const { isConnected, isInternetReachable } = useNetInfo()

  const scrollX = useRef(new Animated.Value(0)).current

  const renderPages = pages.filter(page => {
    if (!page.netRequired) return true
    if (page.netRequired) {
      return (isConnected && isInternetReachable)
    }
  })

  const data = [{}, ...renderPages, {}]

  const onCardPress = (location: string) => {
    navigation.navigate(location)
  }

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <View style={{ elevation: 2, zIndex: 2 }}>
        <Header title='Bite Quotes' textColor={textColor} />
      </View>
      <CardList
        data={data}
        onCardPress={onCardPress}
        scrollX={scrollX} />
      <Indicator renderPages={renderPages} scrollX={scrollX} />
      {!isConnected && !isInternetReachable && <ConnectionError />}
    </View >
  );
};

export default Home;
