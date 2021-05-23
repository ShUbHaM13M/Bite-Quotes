import React, { useEffect } from 'react'
import { View, Text, Dimensions, Pressable, StyleSheet } from 'react-native'
import { base, dark, primary } from '../global/theme';
import styled from 'styled-components'
import { FlatList } from 'react-native-gesture-handler';
import { Heading } from '../global/styles';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface Props {
  showModal: boolean
  setShowModal: (show: boolean) => void
  tags: Array<string>
  toggleTagFromList: (item: string) => void
}

const { height, width } = Dimensions.get('window')
const data = require('../global/tags.json')
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Modal = ({ setShowModal, tags, toggleTagFromList, showModal }: Props) => {

  const anim = useSharedValue(1)

  const animatedStyles = useAnimatedStyle(() => {
    const translateX = interpolate(anim.value, [0, 1], [0, width])
    const opacity = interpolate(anim.value, [0, 1], [1, 0], Extrapolate.CLAMP)
    return {
      opacity,
      transform: [{ translateX }]
    }
  })

  useEffect(() => {
    anim.value = withTiming(showModal ? 0 : 1)
  }, [showModal])

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyles]}
      onPress={() => setShowModal(false)}>
      <Animated.View
        style={[{
          height: height * 0.6,
          marginHorizontal: 20,
          alignSelf: 'stretch',
          alignItems: 'stretch',
          borderRadius: 20,
          backgroundColor: primary
        }]}>
        <Heading
          marginBottom='20px'
          marginTop='20px'
          color={`${dark}`}
          textCenter>Tags</Heading>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
          }}
          data={data}
          renderItem={({ item }) => {
            const present = tags?.find(tag => tag === item.name)
            return <TagModalButton
              present={present}
              onPress={() => toggleTagFromList(item.name)} >
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <Text style={{
                  fontSize: 20,
                  color: present ? dark : primary
                }}>{item.name}</Text>
                <Text style={{
                  fontSize: 20,
                  color: present ? dark : primary
                }}>{item.quoteCount}</Text>
              </View>
            </TagModalButton>
          }}
          keyExtractor={(item) => item._id}
        />
      </Animated.View>
    </AnimatedPressable>
  )
}

const TagModalButton = styled.Pressable`
  background-color: ${(props: { present: any; }) => props.present ? base.accent2 : base.accent};
  margin-vertical: 10px;
  padding: 15px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
  width: 250px;
`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${dark}ee`,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flex: 1,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
})

export default Modal