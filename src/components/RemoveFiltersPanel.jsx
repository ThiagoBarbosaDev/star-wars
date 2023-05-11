import React, { useContext } from 'react'
import Button from './Button'
import StarWarsContext from '../context/StarWarsContext'

function RemoveFiltersPanel() {
  const {
    setFilters: { setUsedFiltersData },
    getFilters: { usedFiltersData },
  } = useContext(StarWarsContext)

  const handleClearFilter = ({ target: { value } }) => {
    const updatedFilterData = usedFiltersData.filter(item => item.column !== value)
    setUsedFiltersData(updatedFilterData)
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

export default RemoveFiltersPanel
