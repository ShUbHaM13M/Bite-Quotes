import React, { useContext, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import BackButton from '../components/buttons/BackButton'
import { QuoteProp } from '../components/QuoteCard'
import { SavedQuotesContext } from '../context/SavedQuotesContext'
import { AuthorText, Heading } from '../global/styles'
import { base, primary } from '../global/theme'

const SavedQuotes = ({ navigation }) => {

  const { quotes }: Array<QuoteProp> | any = useContext(SavedQuotesContext)
  const [scroll, setScroll] = useState<boolean>(true)

  function onQuotePressed(quote: QuoteProp) {
    navigation.navigate('ExpandedSaveQuote', { quote })
  }
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20
    }}>
      <View
        style={styles.header}>
        {/* <BackButton navigation={navigation} /> */}
        {/* Adding a backbutton letter */}
        <Heading flex={1} textCenter marginTop='20px' marginBottom='20px'>Saved Quotes</Heading>
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
    justifyContent: 'space-between'
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
