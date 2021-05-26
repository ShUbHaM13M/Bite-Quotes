import React, { useEffect, useState } from "react"
import { QuoteProp } from "../components/QuoteCard"
import { getSavedQuotesFromStorage, saveQuoteToStorage } from "../utils/useStorage"

export const SavedQuotesContext = React.createContext(null)

interface Props {
  children: React.ReactNode
}

const SavedQuotesProvider = ({ children }: Props) => {

  const [savedQuotes, setSavedQuotes] = useState<Array<QuoteProp>>([])

  useEffect(() => {
    getSavedQuotesFromStorage()
      .then((data: any) => {
        if (data)
          setSavedQuotes(data)
      })
  }, [])

  useEffect(() => {
    saveQuoteToStorage(savedQuotes)
  }, [savedQuotes])

  function saveQuote(quote: QuoteProp) {
    if (isQuoteInStorage(quote._id)) {
      removeQuote(quote)
      return
    }
    setSavedQuotes(prev => [...prev, quote])
  }

  function removeQuote(quote: QuoteProp) {
    setSavedQuotes(prev => prev.filter(item => item._id !== quote._id))
  }

  function isQuoteInStorage(quoteId: string): boolean {
    const isPresent = savedQuotes.some(quote => quote._id === quoteId)
    return isPresent
  }

  const value = {
    quotes: savedQuotes,
    saveQuote,
    isQuoteInStorage,
    removeQuote
  }

  return <SavedQuotesContext.Provider value={value} >
    {children}
  </SavedQuotesContext.Provider>
}

export default SavedQuotesProvider