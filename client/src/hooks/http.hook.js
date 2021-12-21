import { useState, useCallback } from 'react'
import axios from 'axios'

export const useHttpHook = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const data = await axios({
        method,
        url,
        data: body,
        headers,
      }).then((data) => {
        if (data.status == 400 || data.status == 401) {
          throw new Error(data.message || 'Something goes wrong!')
        }
      })

      setLoading(false)

      return data.data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}
