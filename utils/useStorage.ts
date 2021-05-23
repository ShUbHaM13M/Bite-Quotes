import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import { QuoteProp } from "../components/QuoteCard";

const MMKV: MMKVStorage.API = new MMKVStorage.Loader().initialize();
type LiteralUnion<T extends U, U = string> = T | (U & {});

export function clearStorage() {
  return MMKV.clearStore()
}

export const useStorage = (key: LiteralUnion<"currentTheme" | "savedQuotes">) => {
  const [value, setValue] = useMMKVStorage(key, MMKV);
  return [value, setValue];
};

function typeCheck(value: any) {
  const return_value = Object.prototype.toString.call(value);
  const type = return_value.substring(
    return_value.indexOf(" ") + 1,
    return_value.indexOf("]"));

  return type.toLowerCase();
}


export async function getFromStorage(key: LiteralUnion<"currentTheme" | "savedQuotes">, type: LiteralUnion<"Object" | "Array">) {
  try {
    let data;
    if (type === 'Object') {
      data = await MMKV.getMapAsync(key);
    } else if (type === 'Array') {
      data = await MMKV.getArrayAsync(key);
    }
    return data;
  } catch (err) {
    console.log(err)
  }
}

export async function setToStorage(key: LiteralUnion<"currentTheme" | "savedQuotes">, data: any) {
  try {
    if (typeCheck(data) === 'object') {
      await MMKV.setMapAsync(key, data);
    } else if (typeCheck(data) === 'array') {
      await MMKV.setArrayAsync(key, data);
    }
  } catch (err) {
    console.log(err);
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