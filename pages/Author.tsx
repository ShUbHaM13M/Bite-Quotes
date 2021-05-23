import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import AuthorCard from '../components/AuthorCard'
import { Heading } from '../global/styles'
import { base, primary } from '../global/theme'
import rootUrl from '../rootUrl'

export const CARD_HEIGHT = 150
export const SPACING = 20
const height = CARD_HEIGHT + (SPACING * 3) - 40

export interface authorProps {
    _id: string
    name: string
    description: string
}

const Author = ({ navigation }) => {

    const [authors, setAuthors] = useState<Array<authorProps>>([])
    const [lastItemIndex, setLastItemIndex] = useState(0)
    const [loading, setLoading] = useState<boolean>(false)

    const scrollY = useRef(new Animated.Value(0)).current

    const _renderItem = (
        item: authorProps,
        scale: Animated.AnimatedInterpolation,
        opacity: Animated.AnimatedInterpolation,
        onPress: (author: authorProps) => void) => (
        <AuthorCard item={item} scale={scale} opacity={opacity} onPress={onPress} />
    )

    const fetchAuthors = useRef(async (lastIndex: number) => {
        try {
            const result = await fetch(rootUrl + `authors?skip=${lastIndex}`)
            const data = await result.json()
            if (result.ok) {
                const { results } = data
                setAuthors(prev => [].concat(prev, results))
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }).current

    useEffect(() => {
        fetchAuthors(lastItemIndex)
    }, [lastItemIndex])

    const onCardPressed = useRef(function (author: authorProps) {
        navigation.navigate('Author-info', { author })
    }).current

    return (
        <View style={{ flex: 1 }}>
            <View style={{ elevation: 2, backgroundColor: primary }}>
                <Heading marginTop='20px' textCenter marginBottom='20px'>Authors</Heading>
            </View>
            <Animated.FlatList
                style={styles.listStyle}
                bounces={false}
                data={authors}
                scrollEventThrottle={16}
                renderItem={({ index, item }) => {

                    const inputRange = [
                        -1,
                        0,
                        height * index,
                        height * (index + 2)
                    ]
                    const opacityInputRange = [
                        -1,
                        0,
                        height * index,
                        height * (index + 1)
                    ]

                    const outputRange = [1, 1, 1, 0]

                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange
                    })
                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange
                    })

                    return <>
                        { item.name ?
                            _renderItem(
                                item,
                                scale,
                                opacity,
                                onCardPressed)
                            : null
                        }
                    </>
                }}
                keyExtractor={(item: authorProps) => item._id}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                onEndReached={() => {
                    if (loading) return
                    setLoading(true)
                    setLastItemIndex(prev => prev + 20)
                }}
                onEndReachedThreshold={0.5}
            />
            {loading &&
                <View style={{
                    backgroundColor: 'white',
                    height: 50,
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size="large" color={base.accent} />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    listStyle: {
        padding: SPACING,
        marginBottom: SPACING * 0.5,
    },
    authorCard: {
        elevation: 1,
        height: CARD_HEIGHT,
        marginBottom: SPACING,
        backgroundColor: base.accent2,
        borderRadius: 10,
        padding: SPACING,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)'
    }
})

export default Author
