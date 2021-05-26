import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import { QuoteProp } from "../components/QuoteCard";

const MMKV: MMKVStorage.API = new MMKVStorage.Loader().initialize();
type LiteralUnion<T extends U, U = string> = T | (U & {});

export function clearStorage() {
  return MMKV.clearStore()
}

export async function getThemeFromStorage() {
  try {
    const data = await MMKV.getStringAsync('theme')
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function saveThemeToStorage(theme: 'light' | 'dark') {
  try {
    const added = await MMKV.setStringAsync('theme', theme)
    return added
  } catch (err) {
    console.log(err)
  }
}

export async function getSavedQuotesFromStorage() {
  try {
    const data = await MMKV.getArrayAsync('savedQuotes')
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function saveQuoteToStorage(quotes: Array<QuoteProp>) {
  try {
    const added = await MMKV.setArrayAsync('savedQuotes', quotes)
    return added
  } catch (err) {
    console.log(err)
  }
}