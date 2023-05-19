import React, { useMemo, useState } from 'react'
import FilterContext from './FilterContext'
import { FilterContextType, NumericFilter, SortState } from '../Types'

type FilterProviderProps = {
  children: React.ReactNode
}

const SORT_INITIAL_STATE: SortState = { order: { column: 'population', sort: 'ASC' } }

function FilterProvider({ children }: FilterProviderProps) {
  const [searchPlanetValue, setSearchPlanetValue] = useState('')
  const [usedFiltersData, setUsedFiltersData] = useState<NumericFilter[]>([])
  const [filterSortRadio, setFilterSortRadio] = useState(SORT_INITIAL_STATE)
  const [sortData, setSortData] = useState<SortState | null>(null)

  const context = useMemo<FilterContextType>(
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
    [searchPlanetValue, usedFiltersData, filterSortRadio, sortData],
  )

  return <FilterContext.Provider value={context}>{children}</FilterContext.Provider>
}

export default FilterProvider
