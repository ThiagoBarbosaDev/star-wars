import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import ComboBox from './ComboBox'
import Input from './Input'
import StarWarsContext from '../context/StarWarsContext'

const OPERATORS = ['maior que', 'menor que', 'igual a']

const NUMERIC_FILTER_INPUTS_INITIAL_STATE = {
  column: 'population',
  operator: 'maior que',
  value: '0',
}

function NumericFilterPanel({ selectOptions }) {
  const {
    setFilters: { setUsedFiltersData },
  } = useContext(StarWarsContext)
  const [numericFilterInputs, setNumericFilterInputs] = useState(
    NUMERIC_FILTER_INPUTS_INITIAL_STATE
  )

  const handleFilter = () => {
    setUsedFiltersData(prevState => [...prevState, numericFilterInputs])
  }

  const handleClearAllFilters = () => {
    setUsedFiltersData([])
  }

  const onNumericFilterChange = ({ target: { name, value } }) =>
    setNumericFilterInputs(prevState => ({ ...prevState, [name]: value }))

  return (
    <fieldset>
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
    </fieldset>
  )
}

NumericFilterPanel.propTypes = {
  selectOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default NumericFilterPanel
