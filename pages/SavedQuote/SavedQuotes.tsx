import React, { useContext, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import BackButton from '../components/buttons/BackButton'
import { QuoteProp } from '../../components/QuoteCard'
import { SavedQuotesContext } from '../../context/SavedQuotesContext'
import { useTheme } from '../../context/ThemeContext'
import { AuthorText, Heading } from '../../global/styles'
import { base, dark, primary, savedQuoteColors } from '../../global/theme'

const SavedQuotes = ({ navigation }) => {

  const { quotes }: Array<QuoteProp> | any = useContext(SavedQuotesContext)
  const { currentTheme }: any = useTheme()
  const backgroundColor = currentTheme === 'dark'
    ? savedQuoteColors.dark2
    : savedQuoteColors.color2
  const headerColor = currentTheme === 'dark'
    ? savedQuoteColors.dark
    : savedQuoteColors.color
  const textColor = currentTheme === 'dark' ? primary : dark

  const [scroll, setScroll] = useState<boolean>(true)

  function onQuotePressed(quote: QuoteProp) {
    navigation.navigate('ExpandedSaveQuote', { quote })
  }
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20,
      backgroundColor
    }}>
      <View
        style={styles.header}>
        {/* <BackButton navigation={navigation} /> */}
        {/* Adding a backbutton letter */}
        <View style={{ elevation: 2, backgroundColor: headerColor, width: '100%' }}>
          <Heading
            textCenter
            marginTop={20}
            size={30}
            color={textColor}
            marginBottom={20}>Saved Quotes</Heading>
        </View>
      </View>
      <FlatList
        style={{ width: '100%', paddingHorizontal: 20 }}
        data={quotes}
        scrollEnabled={scroll}
        renderItem={({ item }) => {
          return <Pressable
            style={styles.card}
            onPress={() => onQuotePressed(item)}>
            <Text
              style={styles.textStyles}
              numberOfLines={2}>{item.content}</Text>
            <AuthorText>- {item.author}</AuthorText>
          </Pressable>
        }}
        keyExtractor={(item: QuoteProp) => item._id}
      />
      {quotes.length === 0 &&
        <View style={{ flex: 1 }}>
          <Text style={[styles.textStyles, { color: textColor }]}>
            No Saved Quotes here 🙁
          </Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 22,
    flex: 1
  },
  header: {
    elevation: 2,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    borderRadius: 20,
    backgroundColor: base.accent2,
    borderWidth: 1,
    borderColor: base.borderColor,
    padding: 20,
    marginVertical: 10,
    height: 150
  }
})

export default SavedQuotes
