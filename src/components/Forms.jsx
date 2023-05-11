import React, { useContext } from 'react'
import FilterContext from '../context/FilterContext'
import Input from './Input'
import SortingPanel from './SortingPanel'
import NumericFilterPanel from './NumericFilterPanel'

function Forms() {
  const { setSearchPlanetValue, searchPlanetValue } = useContext(FilterContext)

  return (
    <main>
      <Input
        name="search-planet"
        type="text"
        value={searchPlanetValue}
        onChange={({ target: { value } }) => setSearchPlanetValue(value)}
        dataTestId="name-filter"
      >
        Search for a planet:
      </Input>
      <NumericFilterPanel />
      <SortingPanel />
    </main>
  )
}

export default Forms
