import { useNetInfo } from '@react-native-community/netinfo';
import React, { useRef } from 'react';
import { Animated, View, Dimensions, StyleSheet } from 'react-native';
import BrowseCard from './BrowseCard';
import ConnectionError from '../../components/ConnectionError';
import Header from '../../components/Header';
import { useTheme } from '../../context/ThemeContext';
import { base, dark, primary } from '../../global/theme';
import pages from '../pageInfo';

const { width, height } = Dimensions.get('window')
const CARD_WIDTH = width * 0.8
const SPACER_WIDTH_SIZE = (width - CARD_WIDTH) / 2
const CARD_HEIGHT = height * 0.6

const Home = ({ navigation }: any) => {

  const { currentTheme }: any = useTheme();
  const textColor = currentTheme === 'dark' ? primary : dark

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
    <View style={{ flex: 1 }}>
      <View style={{ elevation: 2, zIndex: 2 }}>
        <Header title='Bite Quotes' textColor={textColor} />
      </View>
      <View style={StyleSheet.absoluteFillObject}>
        {renderPages.map((page, index) => {
          const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
          ]
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0]
          })
          return <Animated.View key={index} style={[
            { backgroundColor: currentTheme === 'light' ? page.color2 : page.dark1, opacity },
            StyleSheet.absoluteFillObject,
          ]} />
        })}
      </View>
      <Animated.FlatList
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: 'center' }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        decelerationRate={0}
        horizontal
        data={data}
        bounces={false}
        renderItem={({ item, index }: { item: any, index: number }) => {

          if (!item.name) {
            return <View style={{
              width: SPACER_WIDTH_SIZE
            }} />
          }

          const inputRange = [
            (index - 2) * CARD_WIDTH,
            (index - 1) * CARD_WIDTH,
            (index) * CARD_WIDTH
          ]

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0]
          })
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9]
          })

          return <Animated.View style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            transform: [{ translateY }, { scale }]
          }}>
            <BrowseCard
              item={item}
              textColor={textColor}
              color={currentTheme === 'light' ? item.color : item.dark}
              onPress={onCardPress} />
          </Animated.View>
        }}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />
      <View style={styles.indicatorContainer}>
        {renderPages.map((_, index) => {
          const inputRange = [
            (index - 1) * CARD_WIDTH,
            (index) * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
          ]
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.3, 1],
            extrapolate: 'clamp'
          })
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: 'clamp'
          })
          return <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                transform: [{ scale }],
                backgroundColor: base.accent,
                opacity
              }
            ]} />
        })}
      </View>
      {!isConnected && !isInternetReachable && <ConnectionError />}
    </View >
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    height: 8,
    width: 8,
    borderRadius: 50,
    marginHorizontal: 8,
  }
})

export default Home;
