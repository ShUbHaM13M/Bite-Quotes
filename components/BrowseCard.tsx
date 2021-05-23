import React from 'react'
import { Pressable, StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import { base, dark } from '../global/theme';
import globalStyles, { Card, Heading, RoundedButton } from '../global/styles';
import Svg, { Path, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window')
const SPACING = 10
const CARD_WIDTH = width * 0.72 + SPACING

interface props {
    item: object,
    color: string,
    textColor: string,
    onPress: (location: string) => void,
}

const BrowseCard: React.FC<props> = ({ item, onPress, color, textColor, }) => {

    return (
        <Card
            paddingHorizontal={`${SPACING * 2}px`}
            paddingTop={`${SPACING * 4}px`}
            paddingBottom={`${SPACING * 2}px`}
            borderRadius='20px'
            backgroundColor={color}
            borderWidth='1px'
            borderColor={base.borderColor}
            height='500px'
            width={`${CARD_WIDTH}px`}
            marginHorizontal={`${SPACING}px`}>
            <Pressable
                style={{
                    flex: 1,
                    alignItems: 'center',
                }}
                onPress={() => onPress(item.name)}>
                <View style={{
                    flex: 1
                }}>
                    <Heading
                        color={textColor}
                        textCenter
                        marginBottom='30px'>{item.name}</Heading>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        color: textColor
                    }}>
                        {item.description}
                    </Text>
                </View>
                <RoundedButton onPress={() => onPress(item.name)} primary >
                    <Svg width="35" height="36" viewBox="0 0 35 36" fill="none">
                        <Rect width="34" height="35" transform="translate(0.881531 0.0521851)" fill="#F16A67" />
                        <Path d="M7.96486 17.5522H27.7982" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M17.8815 7.34387L27.7982 17.5522L17.8815 27.7605" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>

                </RoundedButton>
            </Pressable>
        </Card>
    )
}

export default BrowseCard

const styles = StyleSheet.create({
    textStyles: {
        marginBottom: 30,
    },
    description: {
        fontSize: 20,
    }
})
