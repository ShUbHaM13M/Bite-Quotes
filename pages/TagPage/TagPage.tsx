import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated'
import Modal from './Modal'
import { QuoteProp } from '../../components/QuoteCard'
import TagsList from '../../components/TagsList'
import TinderSwipe from '../../components/TinderSwipe'
import SavedQuotesProvider from '../../context/SavedQuotesContext'
import { useTheme } from '../../context/ThemeContext'
import { Heading } from '../../global/styles'
import { base } from '../../global/theme'
import rootUrl from '../../rootUrl'
import useFetch from '../../utils/useFetch'

const animationConfig = {
  duration: 350,
  easing: Easing.ease
}

const TagPage = ({ route }: any) => {

  const { tag } = route.params
  const [tagList, setTagList] = useState<Array<string>>([tag])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [quotes, setQuotes] = useState<Array<QuoteProp>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [showCards, setShowCards] = useState<boolean>(true)
  const [lastIndex, setLastIndex] = useState<number | null>(0)
  const [skipCount, setSkipCount] = useState<number | null>(0)

  function toggleTagsFromList(toToggle: string) {
    if (checkIfPresent(toToggle)) {
      setTagList(removeFromTagList(toToggle))
      setSkipCount(0)
      setShowModal(false)
      return
    }
    setTagList(addToTagList(toToggle))
    setSkipCount(0)
    setShowModal(false)
  }

  function checkIfPresent(toCheck: string): boolean {
    return tagList.indexOf(toCheck) !== -1
  }

  function addToTagList(toAdd: string) {
    return [...tagList, toAdd]
  }

  function removeFromTagList(toRemove: string) {
    if (tagList.length !== 1)
      return [...tagList.filter(item => item !== toRemove)]
    return tagList
  }

  const url = `quotes?skip=${skipCount}&tags=${tagList.length !== 0
    ? tagList.join(',')
    : 'friendship'}`

  const fetchQuotes = useCallback(() => {
    useFetch(url)
      .then(data => {
        if (data && data.results) {
          const { results } = data
          setLastIndex(data.lastItemIndex)
          setQuotes(results)
          setLoading(false)
          return
        }
      })
      .catch(err => console.log(err))
  }, [url])

  function fetchMore() {
    if (lastIndex === null) {
      setSkipCount(0)
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
        <Heading
          size={30}
          marginTop={20}
          textCenter
          marginBottom={20}>Quotes</Heading>
        <View style={{
          flex: 1,
          alignSelf: 'stretch',
        }}>
          <View style={{
            paddingHorizontal: 10,
          }}>
            <TagsList
              editable
              tags={tagList}
              setTags={setTagList}
              removeFromTagList={removeFromTagList}
              showFilterModal={setShowModal} />
          </View>
          {!loading && quotes &&
            <TinderSwipe
              backgroundColor='white'
              render={showCards}
              toggleRender={setShowCards}
              data={quotes}
              fetchMore={fetchMore}
            />
          }
          {loading &&
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator size='large' color={base.accent} />
            </View>
          }
        </View>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          tags={tagList}
          toggleTagFromList={toggleTagsFromList} />
      </View>
    </SavedQuotesProvider>
  )
}

export default TagPage
