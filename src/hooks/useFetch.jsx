import { useEffect, useReducer, useState } from 'react'
// https://www.robinwieruch.de/react-hooks-fetch-data/
// https://dev.to/pallymore/clean-up-async-requests-in-useeffect-hooks-90h

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      throw new Error()
  }
}

const useFetch = (initialUrl, initialData = []) => {
  const [url, setUrl] = useState(initialUrl)

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: initialData,
  })

  useEffect(() => {
    dispatch({ type: 'FETCH_INIT' })
    // logic to enable fetch requisition cancelation on component unmount
    const controller = new AbortController()
    const { signal } = controller
    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal })
        const result = await response.json()
        dispatch({ type: 'FETCH_SUCCESS', payload: result })
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' })
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url])

  return [state, setUrl]
}

export default useFetch
