import { useEffect, useReducer, useState } from 'react'
import { IPlanets } from '../Types'

// https://www.robinwieruch.de/react-hooks-fetch-data/
// https://dev.to/pallymore/clean-up-async-requests-in-useeffect-hooks-90h

type ParsedResult = {
  results: IPlanets[]
} | null

interface FetchState {
  data: ParsedResult
  isLoading: boolean
  isError: boolean
}

type FetchAction =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: ParsedResult }
  | { type: 'FETCH_FAILURE' }

const dataFetchReducer = (state: FetchState, action: FetchAction) => {
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
      return state
  }
}

const useFetch = (
  initialUrl: string,
  initialData: ParsedResult = null,
): [FetchState, React.Dispatch<React.SetStateAction<string>>] => {
  const [url, setUrl] = useState<string>(initialUrl)

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: initialData,
  })

  useEffect(() => {
    dispatch({ type: 'FETCH_INIT' })
    const controller = new AbortController()
    const { signal } = controller
    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal })
        const result = await response.json()
        dispatch({ type: 'FETCH_SUCCESS', payload: result })
      } catch (error) {
        if (controller.signal.aborted) return
        dispatch({ type: 'FETCH_FAILURE' })
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [url])

  return [state, setUrl]
}

export default useFetch
