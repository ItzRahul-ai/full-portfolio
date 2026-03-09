import { useCallback, useState } from 'react'

export function useApi(apiCall, options = {}) {
  const { onSuccess, onError } = options
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  const execute = useCallback(
    async (...args) => {
      setLoading(true)
      setError('')
      try {
        const result = await apiCall(...args)
        setData(result)
        if (onSuccess) onSuccess(result)
        return result
      } catch (apiError) {
        const message = apiError?.message || 'Request failed.'
        setError(message)
        if (onError) onError(apiError)
        throw apiError
      } finally {
        setLoading(false)
      }
    },
    [apiCall, onError, onSuccess],
  )

  return { execute, loading, error, data, setData, setError }
}
