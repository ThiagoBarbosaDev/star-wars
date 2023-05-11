import React, { useContext, useEffect, useState } from 'react'
import StarWarsContext from '../context/StarWarsContext'
import ComboBox from './ComboBox'
import Input from './Input'
import RemoveFiltersPanel from './RemoveFiltersPanel'

const OPERATORS = ['maior que', 'menor que', 'igual a']
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
  const [numericFilterInputs, setNumericFilterInputs] = useState(
    NUMERIC_FILTER_INPUTS_INITIAL_STATE
  )
  const [selectOptions, setSelectOptions] = useState(SELECT_OPTIONS)

  const {
    setFilters: {
      setSearchPlanetValue,
      setUsedFiltersData,
      setFilterSortRadio,
      setDataFilteredBySort,
    },
    getFilters: { searchPlanetValue, usedFiltersData, filterSortRadio },
    data,
  } = useContext(StarWarsContext)

  const handleFilter = () => {
    setUsedFiltersData(prevState => [...prevState, numericFilterInputs])
  }

  const handleClearAllFilters = () => {
    setUsedFiltersData([])
  }

  const handleClickSortFilter = () => {
    const { column, sort } = filterSortRadio.order
    const sortedData = data.sort((a, b) => {
      if (a[column] === 'unknown') {
        return 1
      }
      if (b[column] === 'unknown') {
        return -1
      }
      if (sort === 'ASC') {
        return Number(a[column]) - Number(b[column])
      }
      return Number(b[column]) - Number(a[column])
    })
    setDataFilteredBySort([...sortedData])
  }

  useEffect(() => {
    const notUsedFilterHeading = SELECT_OPTIONS.filter(
      option => !usedFiltersData.some(filter => filter.column === option)
    )
    setSelectOptions(notUsedFilterHeading)
    setNumericFilterInputs(prevState => ({ ...prevState, column: notUsedFilterHeading[0] }))
  }, [usedFiltersData])

  const onNumericFilterChange = ({ target: { name, value } }) => {
    setNumericFilterInputs(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <section>
      <Input
        name="search-planet"
        type="text"
        value={searchPlanetValue}
        onChange={({ target: { value } }) => setSearchPlanetValue(value)}
        dataTestId="name-filter"
      >
        Search for a planet:
      </Input>
      <fieldset>
        <legend> Filter By </legend>
        <ComboBox
          name="column"
          value={numericFilterInputs.column}
          onChange={event => onNumericFilterChange(event)}
          data={selectOptions}
          dataTestId="column-filter"
        />
        <ComboBox
          name="operator"
          value={numericFilterInputs.operator}
          onChange={event => onNumericFilterChange(event)}
          data={OPERATORS}
          dataTestId="comparison-filter"
        />
        <Input
          name="value"
          type="number"
          value={numericFilterInputs.value}
          onChange={event => onNumericFilterChange(event)}
          dataTestId="value-filter"
        />
        <button data-testid="button-filter" type="button" onClick={handleFilter}>
          Search
        </button>
        <button type="button" onClick={handleClearAllFilters} data-testid="button-remove-filters">
          Reset Filters
        </button>
      </fieldset>
      <RemoveFiltersPanel />
      <fieldset>
        <legend>Sort Columns</legend>
        <ComboBox
          name="operator-selector"
          value={filterSortRadio.order.column}
          onChange={({ target: { value } }) =>
            setFilterSortRadio({ order: { ...filterSortRadio.order, column: value } })
          }
          data={SELECT_OPTIONS}
          dataTestId="column-sort"
        />
        <Input
          name="sort"
          type="radio"
          value="ASC"
          checked={filterSortRadio.order.sort === 'ASC'}
          onChange={({ target: { value } }) =>
            setFilterSortRadio({ order: { ...filterSortRadio.order, sort: value } })
          }
          dataTestId="column-sort-input-asc"
        >
          ASC
        </Input>
        <Input
          name="sort"
          type="radio"
          value="DESC"
          checked={filterSortRadio.order.sort === 'DESC'}
          onChange={({ target: { value } }) =>
            setFilterSortRadio({
              ...filterSortRadio,
              order: { ...filterSortRadio.order, sort: value },
            })
          }
          dataTestId="column-sort-input-desc"
        >
          DESC
        </Input>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={() => handleClickSortFilter()}
        >
          Ordenar
        </button>
      </fieldset>
    </section>
  )
}

export default Forms
