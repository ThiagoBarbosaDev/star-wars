import { useEffect, useState } from 'react'
import { PLANETS_ENDPOINT } from '../env/endpoints'
import deleteProperty from '../helpers/deleteProperty'

const useGetPlanets = (initialState = []) => {
  const [planetData, setPlanetData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(true)
  const [renderData, setRenderData] = useState([])

  useEffect(() => {
    const getPlanets = async () => {
      const data = await fetch(PLANETS_ENDPOINT)
      const response = await data.json()
      const filteredResponse = deleteProperty(response.results, 'residents')
      setPlanetData(filteredResponse)
      setRenderData(filteredResponse)
      setIsLoading(false)
    }
    getPlanets()
  }, [])

  return [planetData, renderData, setRenderData, isLoading]
}

export default useGetPlanets
