import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const rawValue = localStorage.getItem(key)
      return rawValue ? JSON.parse(rawValue) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore write issues for private-mode and unsupported storage.
    }
  }, [key, value])

  return [value, setValue]
}
