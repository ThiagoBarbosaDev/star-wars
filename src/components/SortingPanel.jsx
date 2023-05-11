import React, { useContext } from 'react'
import ComboBox from './ComboBox'
import Input from './Input'
import StarWarsContext from '../context/StarWarsContext'

const SELECT_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
]

function SortingPanel() {
  const {
    setFilters: { setFilterSortRadio },
    getFilters: { filterSortRadio },
    setSortData,
  } = useContext(StarWarsContext)

  const handleClickSortFilter = () => {
    setSortData(filterSortRadio)
  }

  return (
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
      <button type="button" data-testid="column-sort-button" onClick={handleClickSortFilter}>
        Ordenar
      </button>
    </fieldset>
  )
}

export default SortingPanel
