import React from 'react'
import { View, Text, Pressable, StyleSheet, Linking, ScrollView } from 'react-native'
import { base, primary } from '../../global/theme'
import styled from 'styled-components'
import { Link } from '../../global/styles'

const AuthorInfo = ({ navigation, route }: any) => {

  const { author } = route.params

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Name>{author.name}</Name>
      <Description >{author.description}</Description>
      <Bio>
        <ScrollView>
          <BioText>{author.bio}</BioText>
          <Pressable
            style={({ pressed }) => [{
              marginVertical: 20,
              // borderWidth: 1,
              padding: 10,
              opacity: pressed ? 0.6 : 1,
              borderRadius: 10
            }]}
            onPress={() => {
              Linking.openURL(author.link)
            }}>
            <Link>More info</Link>
          </Pressable>
        </ScrollView>
      </Bio>
      <Pressable
        style={({ pressed }) => [styles.quoteButton, {
          backgroundColor: pressed ? base.accent2 : base.accent
        }]}
        onPress={() => {
          navigation.navigate('Quotes', { authorSlug: author.slug })
        }}>
        <Text style={{
          fontSize: 16,
          color: primary
        }}>Quotes - {author.quoteCount}</Text>
      </Pressable>

    </View>
  )
}

const Name = styled.Text`
  font-size: 30px;
  font-weight: 500;
  margin-vertical: 20px;
  text-align: center;
  border-bottom-width: 1px;
  padding-bottom: 20px;
`

const Description = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: 200;
`

const Bio = styled.View`
  flex: 1;
  background-color: ${base.accent2};
  margin-vertical: 20px;
  padding-horizontal: 20px;
  padding-vertical: 20px;
  border-radius: 10px;
`

const BioText = styled.Text`
  font-size: 22px;
`

const styles = StyleSheet.create({
  quoteButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: base.borderColor,
  }
})

export default AuthorInfo
