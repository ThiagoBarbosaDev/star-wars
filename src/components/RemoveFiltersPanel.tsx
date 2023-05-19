import React, { useContext } from 'react'
import Button from './Button'
import FilterContext from '../context/FilterContext'
import { FilterContextType, NumericFilter } from '../Types'

type RemoveFiltersPanelProps = {
  setNumericFilterInputs: React.Dispatch<React.SetStateAction<NumericFilter>>
}

function RemoveFiltersPanel({ setNumericFilterInputs }: RemoveFiltersPanelProps) {
  const { setUsedFiltersData, usedFiltersData } = useContext(FilterContext) as FilterContextType

  const handleClearFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.getAttribute('data-value')
    const updatedFilterData = usedFiltersData.filter((item) => item.column !== value)
    setUsedFiltersData(updatedFilterData)
    setNumericFilterInputs(
      (prevState: NumericFilter) => ({ ...prevState, column: value } as NumericFilter),
    )
  }

  return (
    <div>
      <fieldset>
        <legend>Used Filters</legend>
        {usedFiltersData.map(({ column }) => (
          <div data-testid="filter" key={column}>
            <Button
              isSubmit={false}
              name="removeFilter"
              dataValue={column}
              onClick={handleClearFilter}
            >
              {column}
            </Button>
          </div>
        ))}
      </fieldset>
    </div>
  )
}

export default RemoveFiltersPanel
