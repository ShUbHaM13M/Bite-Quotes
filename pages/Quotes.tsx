import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { QuoteProp } from '../components/QuoteCard';
import TagsList from '../components/TagsList';
import { Heading } from '../global/styles';
import { base, quoteColors } from '../global/theme';
import rootUrl from '../rootUrl';
import { useTheme } from '../context/ThemeContext';
import SavedQuotesProvider from '../context/SavedQuotesContext';
import TinderSwipe from '../components/TinderSwipe';

const Quotes = ({ navigation, route }) => {

  const [authorSlug, setAuthorSlug] = useState<string>(
    route?.params?.authorSlug
      ? route.params.authorSlug
      : '')

  const { currentTheme }: any = useTheme();
  const backgroundColor = currentTheme?.name === 'light' ? quoteColors.color : quoteColors.dark
  const [quotes, setQuotes] = useState<Array<QuoteProp>>([])
  const [tags, setTags] = useState<Array<string> | undefined>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [lastIndex, setLastIndex] = useState<number | null>(0)
  const [skipCount, setSkipCount] = useState<number | null>(0)
  const [showCards, setShowCards] = useState<boolean>(true)
  const [fetchedCount, setFetchedCount] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)

  const url = `${rootUrl}quotes?author=${authorSlug}&skip=${skipCount}`

  const fetchQuotes = useCallback(async () => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      if (res.ok) {
        if (data && data.results) {
          const { results } = data
          setLastIndex(data.lastItemIndex)
          setFetchedCount(data.count)
          setTotalCount(data.totalCount)
          setQuotes(results)
          setTags(results[0].tags)
        }
        setLoading(false)
        return
      }
      console.log('not found')
    } catch (err) {
      console.log(err.message)
    }
  }, [url])

  function fetchMore() {
    if (fetchedCount === totalCount) {
      setSkipCount(0)
      return
    }
    setSkipCount(lastIndex)
  }

  useEffect(() => {
    setLoading(true)
    fetchQuotes()
    setShowCards(true)
    return () => {
      setQuotes([])
    }
  }, [url])

  return (
    <SavedQuotesProvider>

      <View style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <Heading size='30px' marginBottom='20px' marginTop='20px' textCenter>Quotes</Heading>
        {!loading && quotes &&
          <View style={{
            flex: 1,
            alignSelf: 'stretch',
            alignItems: 'center',
          }}>
            <View style={{
              paddingHorizontal: 10,
              alignSelf: 'stretch'
            }}>
              <TagsList
                navigation={navigation}
                tags={tags || []} />
            </View>
            <TinderSwipe
              setTags={setTags}
              render={showCards}
              toggleRender={setShowCards}
              data={quotes}
              fetchMore={fetchMore} />
          </View>
        }
        {loading &&
          <ActivityIndicator size='large' color={base.accent} />}
      </View >
    </SavedQuotesProvider>
  );
};

export default Quotes;