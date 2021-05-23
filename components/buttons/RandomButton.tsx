import React from "react"
import { Pressable, StyleSheet, View } from "react-native"
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg"
import { base } from "../../global/theme"

interface RandomButtonProps {
  onPress: () => void,
}

const RandomButton = ({ onPress }: RandomButtonProps) => {
  return (
    <View
      style={{
        marginVertical: 20,
        alignItems: 'center',
      }}>
      <Pressable style={({ pressed }) => [
        style.roundedButton, {
          backgroundColor: pressed ? base.accent2 : base.accent
        }
      ]}
        onPress={onPress}>
        <Svg width="26" height="28" viewBox="0 0 26 28" fill="none">
          <G clip-path="url(#clip0)">
            <Path d="M25.1568 19.5325C25.6145 20.0267 25.6145 20.8281 25.1568 21.3223L21.2505 25.5402C20.5176 26.3318 19.25 25.777 19.25 24.6453V22.5368H16.3796C16.2993 22.5368 16.2198 22.5189 16.1461 22.4844C16.0724 22.4498 16.0061 22.3992 15.9513 22.3358L12.5062 18.3493L15.1103 15.3359L17.6875 18.318H19.25V16.2097C19.25 15.0792 20.5168 14.5223 21.2505 15.3147L25.1568 19.5325ZM1.08594 9.88055H5.1875L7.7647 12.8627L10.3688 9.84933L6.92373 5.86282C6.86891 5.79938 6.80259 5.7488 6.7289 5.71422C6.6552 5.67964 6.57571 5.66179 6.49536 5.6618H1.08594C0.762354 5.6618 0.5 5.94514 0.5 6.29461V9.24774C0.5 9.59721 0.762354 9.88055 1.08594 9.88055ZM19.25 9.88055V11.9891C19.25 13.1208 20.5176 13.6755 21.2505 12.884L25.1568 8.66613C25.6145 8.17185 25.6145 7.3705 25.1568 6.87627L21.2505 2.65853C20.5168 1.86603 19.25 2.42296 19.25 3.55343V5.6618H16.3796C16.2993 5.66181 16.2198 5.67966 16.1461 5.71424C16.0724 5.74882 16.0061 5.7994 15.9513 5.86282L5.1875 18.318H1.08594C0.762354 18.318 0.5 18.6014 0.5 18.9509V21.904C0.5 22.2535 0.762354 22.5368 1.08594 22.5368H6.49536C6.65776 22.5368 6.81289 22.464 6.92373 22.3358L17.6875 9.88055H19.25Z" fill="white" />
          </G>
          <Defs>
            <ClipPath id="clip0">
              <Rect width="25" height="27" fill="white" transform="translate(0.5 0.599304)" />
            </ClipPath>
          </Defs>
        </Svg>
      </Pressable>
    </View>
  )
}

const style = StyleSheet.create({
  roundedButton: {
    borderRadius: 100,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default RandomButton