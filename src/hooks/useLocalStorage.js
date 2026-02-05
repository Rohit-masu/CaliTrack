import { useState, useEffect } from 'react'

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const item = localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error)
    } finally {
      setIsInitialized(true)
    }
  }, [key])

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue))
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error)
      }
    }
  }, [storedValue, key, isInitialized])

  const clearStorage = () => {
    localStorage.removeItem(key)
    setStoredValue(initialValue)
  }

  return [storedValue, setStoredValue, clearStorage, isInitialized]
}

export default useLocalStorage