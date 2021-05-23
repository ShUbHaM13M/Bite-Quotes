import { useNavigation } from '@react-navigation/core';
import React, { Dispatch, SetStateAction } from 'react'
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import styled from 'styled-components';
import { base } from '../global/theme';
import CustomPressable from './buttons/CustomPressable';

interface Props {
  tags: Array<string>
  navigation?: any
  editable?: boolean
  setTags?: React.Dispatch<SetStateAction<string[]>>
  showFilterModal?: React.Dispatch<SetStateAction<boolean>>
  removeFromTagList?: (toRemove: string) => string[]
}

const TagsList = ({
  tags,
  navigation,
  editable = false,
  setTags,
  showFilterModal,
  removeFromTagList
}: Props) => {

  function onTagPressed(tag: string) {
    if (navigation) {
      navigation.navigate('TagPage', { tag })
      return
    }
    if (editable && setTags && removeFromTagList) {
      setTags(() => removeFromTagList(tag))
    }
  }

  return (
    <View style={{
      flexDirection: 'row'
    }}>
      <FlatList
        style={{
          padding: 10,
        }}
        data={tags}
        horizontal={true}
        scrollToOverflowEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CustomPressable
            styles={styles.tagStyles}
            onPress={() => onTagPressed(item)}>
            <Text style={styles.textStyle}>{item}</Text>
            {
              editable &&
              <CrossText>&#x2716;</CrossText>
            }
          </CustomPressable>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      { editable &&
        <CustomPressable
          onPress={() => showFilterModal ? showFilterModal(true) : null}
          styles={styles.filterButton}>
          <Text style={styles.textStyle}>Filter</Text>
        </CustomPressable>
      }
    </View>
  )
}

const CrossText = styled.Text`
  color: white;
  margin-left: 10px;
`

const styles = StyleSheet.create({
  tagStyles: {
    borderRadius: 100,
    height: 45,
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginRight: 10,
    alignItems: 'center',
  },
  filterButton: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
  }
})

export default TagsList
