import {useState, useCallback} from 'react'

export const useHttp = () => {
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoad(true)

    try {
      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if(!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      setLoad(false) //if went wrong - error
      return data

    } catch (e) {
      setLoad(false)
      setErr(e.message)
      throw e
    }

  }, [])

  const clearErr = () => setErr(null)

  return {load, err, request, clearErr}
}