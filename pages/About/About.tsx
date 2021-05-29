import React from 'react'
import { StyleSheet, Text, View, Image, Linking, Pressable, TouchableOpacity, ViewStyle, StyleProp, Share, ScrollView } from 'react-native'
import { useTheme } from '../../context/ThemeContext'
import { Heading, Link } from '../../global/styles'
import { aboutColors, base, dark, primary } from '../../global/theme'
import { version as app_version } from '../../package.json';

const About = () => {

  const { currentTheme }: any = useTheme()
  const backgroundColor = currentTheme === 'dark'
    ? dark
    : primary
  const textColor = currentTheme === 'dark' ? primary : dark

  const gitUrl = "https://github.com/lukePeavey/quotable"

  const onShare = async () => {
    try {
      await Share.share(
        {
          title: 'Sharing Plexus Dictionary',
          message:
            'Checkout this app on playstore: https://play.google.com/store/apps/details?id=com.bitequotes',
        },
        {
          dialogTitle: 'Share this app..',
        },
      );
    } catch (e) { }
  };

  const onReportPressed = () => {
    Linking.openURL("mailto:shubham.heeralal@gmail.com")
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor
    }}>
      <View style={[styles.header, { backgroundColor }]}>
        <Heading
          textCenter
          marginTop={40}
          size={30}
          color={textColor}
          marginBottom={10}>About</Heading>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          padding: 20,
        }}>
          <View style={{
            flexDirection: 'row'

          }}>

            <View style={[
              styles.imageContainer,
              {
                backgroundColor: currentTheme === 'light' ? primary : dark,
              }
            ]}>
              <Image style={styles.image} source={require('../../assets/images/SplashLogo.png')} />
            </View>
            <View style={{
              marginLeft: 20,
            }}>
              <Text style={{
                fontSize: 24,
                color: textColor,
                marginTop: 10,
                fontFamily: 'Poppins-Medium'
              }}>Bite Quotes</Text>
              <Text style={[styles.copyrightText, { color: textColor }]}>
                Copyright © 2021, v-{app_version}
              </Text>
            </View>
          </View>
          <ScrollView style={{
            flex: 1,
            alignSelf: 'stretch',
            padding: 20,
            margin: 20,
            marginHorizontal: 10,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: currentTheme === 'light' ? dark : primary
          }}>
            <Text style={[{
              color: textColor,
              fontSize: 22,
              fontFamily: 'Poppins-Regular'
            }]}>
              🔷 React Native
              </Text>
            <Text style={[{
              fontFamily: 'Poppins-Regular',
              color: textColor,
              fontSize: 22,
              marginTop: 10
            }]}>
              🔷 Getting the quotes from:
            </Text>
            <Link
              onPress={() => Linking.openURL(gitUrl)}>
              {gitUrl}
            </Link>
            <View style={{
              paddingVertical: 20,
            }}>
              <TouchableOpacity style={[
                styles.button,
                { backgroundColor: base.accent2 }
              ]} onPress={onReportPressed}>
                <Text style={[
                  styles.buttonText,
                  { color: dark }
                ]}>Found a bug ?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onShare}>
                <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <Text style={[
          styles.footer,
          {
            color: textColor,
            borderColor: currentTheme === 'dark'
              ? 'rgba(255, 255, 255, 0.3)'
              : base.borderColor
          }]}>
          Made with <Text style={{ color: "#D6524A", fontSize: 22 }}>❣</Text> in India 🇮🇳
        </Text>
      </View>
    </View >
  )
}

export default About

const styles = StyleSheet.create({
  header: {
    elevation: 2,
    width: '100%'
  },
  footer: {
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    fontFamily: 'Poppins-Light'
  },
  imageContainer: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: base.borderColor
  },
  image: {
    height: 50,
    width: 50
  },
  copyrightText: {
    fontSize: 16,
    fontFamily: 'Poppins-ExtraLight',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: primary, fontFamily: 'Poppins-Regular'
  },
  button: {
    backgroundColor: base.accent,
    padding: 20,
    minWidth: 120,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10
  }
})
