import React, { ChangeEvent, useContext, useState } from 'react'
import ComboBox from './ComboBox'
import Input from './Input'
import FilterContext from '../context/FilterContext'
import RemoveFiltersPanel from './RemoveFiltersPanel'
import { FilterContextType, NumericFilter } from '../Types'

const OPERATORS = ['maior que', 'menor que', 'igual a']

const NUMERIC_FILTER_INPUTS_INITIAL_STATE: NumericFilter = {
  column: 'population',
  operator: 'maior que',
  value: '0',
}

const COLUMN_OPTIONS_INIT = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
]

function NumericFilterPanel() {
  const { setUsedFiltersData, usedFiltersData } = useContext(FilterContext) as FilterContextType

  const [numericFilterInputs, setNumericFilterInputs] = useState<NumericFilter>(
    NUMERIC_FILTER_INPUTS_INITIAL_STATE,
  )

  const columnOptions = COLUMN_OPTIONS_INIT.filter((option) =>
    usedFiltersData.every((filter) => filter.column !== option),
  )

  const handleFilter = () => {
    const usedfilterDataPayload = [...usedFiltersData, numericFilterInputs] as NumericFilter[]
    setUsedFiltersData(usedfilterDataPayload)

    const updatedColumnOptions = COLUMN_OPTIONS_INIT.filter((option) =>
      usedfilterDataPayload.every((filter) => filter.column !== option),
    )

    setNumericFilterInputs(
      (prevState): NumericFilter =>
        ({ ...prevState, column: updatedColumnOptions[0] || '' } as NumericFilter &
          Record<string, ''>),
    )
  }

  const handleClearAllFilters = () => {
    setUsedFiltersData([])
  }

  const onNumericFilterChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    setNumericFilterInputs((prevState) => ({ ...prevState, [name]: value }))

  return (
    <fieldset>
      <legend> Filter By </legend>
      <ComboBox
        name="column"
        value={numericFilterInputs.column}
        onChange={onNumericFilterChange}
        data={columnOptions}
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
      {!!usedFiltersData.length && (
        <RemoveFiltersPanel setNumericFilterInputs={setNumericFilterInputs} />
      )}
    </fieldset>
  )
}

export default NumericFilterPanel
