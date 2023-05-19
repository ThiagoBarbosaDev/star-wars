import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import FilterContext from '../context/FilterContext'

function RemoveFiltersPanel({ setNumericFilterInputs }) {
  const { setUsedFiltersData, usedFiltersData } = useContext(FilterContext)

  const handleClearFilter = ({ target: { value } }) => {
    const updatedFilterData = usedFiltersData.filter(item => item.column !== value)
    setUsedFiltersData(updatedFilterData)
    setNumericFilterInputs(prevState => ({ ...prevState, column: value }))
  }

  return (
    <div>
      <fieldset>
        <legend>Used Filters</legend>
        {usedFiltersData.map(({ column }) => (
          <div data-testid="filter" key={column}>
            <Button isSubmit={false} name="removeFilter" value={column} onClick={handleClearFilter}>
              {column}
            </Button>
          </div>
        ))}
      </fieldset>
    </div>
  )
}

RemoveFiltersPanel.propTypes = {
  setNumericFilterInputs: PropTypes.func.isRequired,
}

export default RemoveFiltersPanel
