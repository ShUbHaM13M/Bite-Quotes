import React, { useContext } from 'react'
import { View, StatusBar } from 'react-native'
import DeleteButton from '../../components/buttons/DeleteButton'
import ShareButton from '../../components/buttons/ShareButton'
import { SavedQuotesContext } from '../../context/SavedQuotesContext'
import { AuthorText, Card, Heading } from '../../global/styles'
import { base } from '../../global/theme'

const ExpandedSaveQuote = ({ navigation, route }) => {

  const { quote } = route.params

  const { removeQuote }: any = useContext(SavedQuotesContext)

  function onDeletePress() {
    removeQuote(quote)
    navigation.goBack()
  }

  return <Card flex={1}>
    <StatusBar backgroundColor={base.accent2} />
    <View
      style={{
        padding: 20,
        marginVertical: 20,
        flex: 1,
        justifyContent: 'space-between'
      }}>
      <Heading marginBottom={20}>{quote.content}</Heading>
      <View style={{ alignSelf: 'flex-end' }}>
        <AuthorText>- {quote.author}</AuthorText>
      </View>
    </View>
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20,
      marginBottom: 40
    }}>

      <ShareButton quote={quote} />
      <DeleteButton onPress={onDeletePress} />
    </View>
  </Card>
}

export default ExpandedSaveQuote

