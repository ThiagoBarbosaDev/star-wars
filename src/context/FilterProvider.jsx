import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import FilterContext from './FilterContext'

const SORT_INITIAL_STATE = { order: { column: 'population', sort: 'ASC' } }

function StarWarsProvider({ children }) {
  const [searchPlanetValue, setSearchPlanetValue] = useState('')
  const [usedFiltersData, setUsedFiltersData] = useState([])
  const [filterSortRadio, setFilterSortRadio] = useState(SORT_INITIAL_STATE)
  const [sortData, setSortData] = useState(null)

  const context = useMemo(
    () => ({
      setSearchPlanetValue,
      setUsedFiltersData,
      setFilterSortRadio,
      setSortData,
      sortData,
      searchPlanetValue,
      usedFiltersData,
      filterSortRadio,
    }),
    [searchPlanetValue, usedFiltersData, filterSortRadio, sortData]
  )

  return <FilterContext.Provider value={context}>{children}</FilterContext.Provider>
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default StarWarsProvider
