import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
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
    ? dark
    : primary
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
          backgroundColor,
          width: '100%',
          flex: loading ? 1 : 0,
          justifyContent: 'center'
        }} >
          <Heading
            size={30}
            marginTop={40}
            textCenter
            color={textColor}
            marginBottom={10}>Quotes</Heading>
        </View>
        {!loading && quotes &&
          <View style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
            <View style={{
              marginTop: 20,
              paddingHorizontal: 10,
              alignSelf: 'stretch',
            }}>
              <TagsList
                navigation={navigation}
                tags={tags || []} />
            </View>
            <View style={{
              width: '100%',
              flex: 1,
              marginBottom: 20,
              alignItems: 'stretch',
              backgroundColor: 'red',
            }}>
              <TinderSwipe
                setTags={setTags}
                backgroundColor={backgroundColor}
                render={showCards}
                toggleRender={setShowCards}
                data={quotes}
                fetchMore={fetchMore} />
            </View>
          </View>
        }
        {loading &&
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color={base.accent} />
          </View>
        }
      </View>
    </SavedQuotesProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'red'
  }
})

export default Quotes;