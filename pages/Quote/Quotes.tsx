import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { QuoteProp } from '../../components/QuoteCard';
import TagsList from '../../components/TagsList';
import { Heading } from '../../global/styles';
import { base, dark, primary, quoteColors } from '../../global/theme';
import rootUrl from '../../rootUrl';
import { useTheme } from '../../context/ThemeContext';
import SavedQuotesProvider from '../../context/SavedQuotesContext';
import TinderSwipe from '../../components/TinderSwipe';
import useFetch from '../../utils/useFetch';

const Quotes = ({ navigation, route }: any) => {

  const [authorSlug, setAuthorSlug] = useState<string>(
    route?.params?.authorSlug
      ? route.params.authorSlug
      : '')

  const { currentTheme }: any = useTheme();
  const backgroundColor = currentTheme === 'dark'
    ? quoteColors.dark2
    : quoteColors.color2
  const headerColor = currentTheme === 'dark'
    ? quoteColors.dark
    : quoteColors.color
  const textColor = currentTheme === 'dark' ? primary : dark

  const [quotes, setQuotes] = useState<Array<QuoteProp>>([])
  const [tags, setTags] = useState<Array<string> | undefined>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [lastIndex, setLastIndex] = useState<number | null>(0)
  const [skipCount, setSkipCount] = useState<number | null>(0)
  const [showCards, setShowCards] = useState<boolean>(true)
  const [fetchedCount, setFetchedCount] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)

  const url = `quotes?author=${authorSlug}&skip=${skipCount}`

  const fetchQuotes = useCallback(() => {
    useFetch(url)
      .then(data => {
        if (data && data.results) {
          const { results } = data
          setLastIndex(data.lastItemIndex)
          setFetchedCount(data.count)
          setTotalCount(data.totalCount)
          setQuotes(results)
          setTags(results[0].tags)
          setLoading(false)
        }
      })
      .catch(err => console.log(err))
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
        backgroundColor
      }}>
        <View style={{
          elevation: 2,
          backgroundColor: headerColor,
          width: '100%',
          flex: loading ? 1 : 0,
          justifyContent: 'center'
        }} >
          <Heading
            size={30}
            marginTop={20}
            textCenter
            color={textColor}
            marginBottom={20}>Quotes</Heading>
        </View>
        {!loading && quotes &&
          <View style={{
            flex: 1,
            alignSelf: 'stretch',
            alignItems: 'center',
          }}>
            <View style={{
              marginTop: 20,
              paddingHorizontal: 10,
              alignSelf: 'stretch'
            }}>
              <TagsList
                navigation={navigation}
                tags={tags || []} />
            </View>
            <TinderSwipe
              setTags={setTags}
              backgroundColor={backgroundColor}
              render={showCards}
              toggleRender={setShowCards}
              data={quotes}
              fetchMore={fetchMore} />
          </View>
        }
        {loading &&
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'red'
          }}>
            <ActivityIndicator size='large' color={base.accent} />
          </View>
        }
      </View>
    </SavedQuotesProvider>
  );
};

export default Quotes;