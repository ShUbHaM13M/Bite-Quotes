import React, { useContext } from 'react'
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { SavedQuotesContext } from '../context/SavedQuotesContext'
import { AuthorText, Card, Heading } from '../global/styles'
import { base, dark } from '../global/theme'
import LikeButton from './buttons/LikeButton'
import ShareButton from './buttons/ShareButton'

const { width: sWidth } = Dimensions.get('screen')
export const CARD_WIDTH = Math.floor(sWidth * 0.8)
export const CARD_HEIGHT = 450

export interface QuoteProp {
  _id: string,
  content: string,
  author: string,
  authorSlug: string,
  length: number,
  tags: Array<string>,
}

const QuoteCard = (quote: QuoteProp) => {

  const { saveQuote } = useContext(SavedQuotesContext)

  function onLikeButtonPressed() {
    saveQuote(quote)
  }

  return (
    <View>
      <Card
        width={`${CARD_WIDTH + 30}px`}
        height={`${CARD_HEIGHT + 30}px`}
        borderRadius='20px'
        borderWidth='1px'
        borderColor={base.accent}
      >
        <ScrollView
          style={{ marginTop: 30, width: '100%', }}>
          <Heading size='26px' color={dark}>{quote.content}</Heading>
        </ScrollView>
        <AuthorText>- {quote.author}</AuthorText>
        <View style={styles.actionStyles}>
          <ShareButton quote={quote} />
          <LikeButton quoteId={quote._id} onPress={onLikeButtonPressed} />
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  actionStyles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  }
})

export default QuoteCard
