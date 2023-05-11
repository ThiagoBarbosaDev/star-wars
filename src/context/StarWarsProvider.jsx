import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import StarWarsContext from './StarWarsContext'
import useFetch from '../hooks/useFetch'

const SELECT_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
]
const SORT_INITIAL_STATE = { order: { column: 'population', sort: 'ASC' } }
const NUMERIC_FILTER_INPUTS_INITIAL_STATE = {
  column: 'population',
  operator: 'maior que',
  value: '0',
}
const SWAPI_ENDPOINTS = { planets: 'https://swapi.dev/api/planets' }
function StarWarsProvider({ children }) {
  const [apiData] = useFetch(SWAPI_ENDPOINTS.planets)

  const [searchPlanetValue, setSearchPlanetValue] = useState('')
  const [numericFilterInputs, setNumericFilterInputs] = useState(
    NUMERIC_FILTER_INPUTS_INITIAL_STATE
  )

  const [usedFiltersData, setUsedFiltersData] = useState([])

  const [filterSortRadio, setFilterSortRadio] = useState(SORT_INITIAL_STATE)

  const [selectOptions, setSelectOptions] = useState(SELECT_OPTIONS)

  const [sortData, setSortData] = useState(null)
  const planetData = useMemo(() => apiData?.data?.results || [], [apiData])

  const context = useMemo(
    () => ({
      setFilters: {
        setNumericFilterInputs,
        setSearchPlanetValue,
        setUsedFiltersData,
        setFilterSortRadio,
      },
      getFilters: {
        searchPlanetValue,
        usedFiltersData,
        filterSortRadio,
        numericFilterInputs,
      },
      data: planetData,
      selectOptions,
      setSelectOptions,
      setSortData,
      isLoading: apiData.isLoading,
      sortData,
    }),
    [
      searchPlanetValue,
      usedFiltersData,
      filterSortRadio,
      numericFilterInputs,
      selectOptions,
      apiData.isLoading,
      sortData,
      planetData,
    ]
  )

  return <StarWarsContext.Provider value={context}>{children}</StarWarsContext.Provider>
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default StarWarsProvider
