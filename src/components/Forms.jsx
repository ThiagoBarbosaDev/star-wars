import React, { useContext, useEffect, useState } from 'react'
import StarWarsContext from '../context/StarWarsContext'
import Input from './Input'
import RemoveFiltersPanel from './RemoveFiltersPanel'
import SortingPanel from './SortingPanel'
import NumericFilterPanel from './NumericFilterPanel'

const SELECT_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
]

const NUMERIC_FILTER_INPUTS_INITIAL_STATE = {
  column: 'population',
  operator: 'maior que',
  value: '0',
}

function Forms() {
  // todo: removeState after implementing selectOptions logic change, ref l35
  const [, setNumericFilterInputs] = useState(NUMERIC_FILTER_INPUTS_INITIAL_STATE)
  const [selectOptions, setSelectOptions] = useState(SELECT_OPTIONS)

  const {
    setFilters: { setSearchPlanetValue },
    getFilters: { searchPlanetValue, usedFiltersData },
  } = useContext(StarWarsContext)

  // todo: remove useEffect and move this logic to the event handlers, derivate value from usedFilters instead
  useEffect(() => {
    const notUsedFilterHeading = SELECT_OPTIONS.filter(
      option => !usedFiltersData.some(filter => filter.column === option)
    )
    setSelectOptions(notUsedFilterHeading)
    setNumericFilterInputs(prevState => ({ ...prevState, column: notUsedFilterHeading[0] }))
  }, [usedFiltersData])

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
      <NumericFilterPanel selectOptions={selectOptions} />
      {/* <fieldset>
        <legend> Filter By </legend>
        <ComboBox
          name="column"
          value={numericFilterInputs.column}
          onChange={onNumericFilterChange}
          data={selectOptions}
          dataTestId="column-filter"
        />
        <ComboBox
          name="operator"
          value={numericFilterInputs.operator}
          onChange={onNumericFilterChange}
          data={OPERATORS}
          dataTestId="comparison-filter"
        />
        <Input
          name="value"
          type="number"
          value={numericFilterInputs.value}
          onChange={onNumericFilterChange}
          dataTestId="value-filter"
        />
        <button data-testid="button-filter" type="button" onClick={handleFilter}>
          Search
        </button>
        <button type="button" onClick={handleClearAllFilters} data-testid="button-remove-filters">
          Reset Filters
        </button>
      </fieldset> */}
      {!!usedFiltersData.length && <RemoveFiltersPanel />}
      <SortingPanel />
    </main>
  )
}

export default Forms
