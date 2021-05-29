import React from 'react'
import { Pressable, Text, View, Dimensions, StyleSheet } from 'react-native'
import { base, dark } from '../../global/theme';
import globalStyles, { Card, Heading } from '../../global/styles';
import Svg, { Path, Rect } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient'

const { width } = Dimensions.get('window')
const SPACING = 10
const CARD_WIDTH = width * 0.72 + SPACING

interface props {
	item: { name: string, description: string, src: any },
	onPress: (location: string) => void,
}

const BrowseCard: React.FC<props> = ({ item, onPress, }) => {

	return (
		<LinearGradient
			colors={['#F2ACA0', '#EE998A']}
			style={styles.linearGradient}
		>
			<Pressable
				style={{
					flex: 1,
					alignItems: 'center',
					alignSelf: 'stretch',
					paddingVertical: SPACING * 4,
					paddingHorizontal: SPACING * 2
				}}
				onPress={() => onPress(item.name)}>
				<View style={{
					flex: 1
				}}>
					<Heading
						textCenter
						color={dark}
						marginBottom={30}>{item.name}</Heading>
					<Text style={{
						textAlign: 'center',
						fontSize: 20,
						color: dark,
						fontFamily: 'Poppins-Light'
					}}>
						{item.description}
					</Text>
				</View>

				<Pressable
					style={[
						globalStyles.roundedButton,
						{ marginBottom: SPACING * 4 }
					]}
					onPress={() => onPress(item.name)} >
					<Svg width="35" height="36" viewBox="0 0 35 36" fill="none">
						<Rect width="34" height="35" transform="translate(0.881531 0.0521851)" fill="#F16A67" />
						<Path d="M7.96486 17.5522H27.7982" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
						<Path d="M17.8815 7.34387L27.7982 17.5522L17.8815 27.7605" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
					</Svg>

				</Pressable>
			</Pressable>
		</LinearGradient >
	)
}

const styles = StyleSheet.create({
	image: {
		...StyleSheet.absoluteFillObject,
		height: '100%',
		width: '100%',
	},
	linearGradient: {
		width: CARD_WIDTH,
		marginHorizontal: SPACING,
		borderRadius: 20,
		flex: 1,
		borderWidth: 1,
		borderColor: base.borderColor,
		height: 500
	}
})

export default BrowseCard


