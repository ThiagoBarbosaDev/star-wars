import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import Button from './Button';
import ComboBox from './ComboBox';
import Input from './Input';

const OPERATORS = ['maior que', 'menor que', 'igual a'];
const SELECT_OPTIONS = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

const Forms = () => {
  const {
    setFilters: {
      setSearchPlanetValue,
      setFilterHeader,
      setFilterOperator,
      setFilterValue,
      setUsedFiltersData,
      setFilterSortRadio,
      setDataFilteredBySort,
    },
    getFilters: {
      searchPlanetValue,
      filterHeader,
      filterOperator,
      filterValue,
      usedFiltersData,
      filterSortRadio,
    },
    selectOptions,
    setRenderData,
    data,
  } = useContext(StarWarsContext);

  const handleFilter = () => {
    const filters = { filterHeader, filterValue, filterOperator };
    setUsedFiltersData([...usedFiltersData, filters]);
  };

  const handleClearAllFilters = () => {
    setUsedFiltersData([]);
  };

  const handleClearFilter = (header) => {
    const updatedFilterData = usedFiltersData
      .filter((item) => item.filterHeader !== header);
    setUsedFiltersData(updatedFilterData);
  };

  const handleClickSortFilter = () => {
    const { column, sort } = filterSortRadio.order;
    const sortedData = data.sort((a, b) => {
      if (a[column] === 'unknown') { return 1; }
      if (b[column] === 'unknown') { return -1; }
      if (sort === 'ASC') { return Number(a[column]) - Number(b[column]); }
      return Number(b[column]) - Number(a[column]);
    });
    setDataFilteredBySort([...sortedData]);
  };

  const renderRemoveFilterButtons = () => usedFiltersData
    .map(({ filterHeader: option }) => (
      <div data-testid="filter" key={ option }>
        <button
          type="button"
          name={ option }
          onClick={ (event) => handleClearFilter(event.target.name) }
        >
          {option}
        </button>
      </div>
    ));

  return (
    <section>
      <Input
        name="search-planet"
        type="text"
        value={ searchPlanetValue }
        onChange={ ({ target: { value } }) => setSearchPlanetValue(value) }
        data-testid="name-filter"
      >
        Search for a planet:
      </Input>
      <fieldset>
        <legend> Filter By </legend>
        <ComboBox
          name="numeric-selector"
          value={ filterHeader }
          onChange={ ({ target: { value } }) => setFilterHeader(value) }
          data={ selectOptions }
          data-testid="column-filter"
        />
        <ComboBox
          name="operator-selector"
          value={ filterOperator }
          onChange={ ({ target: { value } }) => setFilterOperator(value) }
          data={ OPERATORS }
          data-testid="comparison-filter"
        />
        <Input
          name="numeric-filter"
          type="number"
          value={ filterValue }
          onChange={ ({ target: { value } }) => setFilterValue(value) }
          data-testid="value-filter"
        />
        <Button
          data-testid="button-filter"
          onClick={ () => handleFilter() }
        >
          Search
        </Button>
        <button
          type="button"
          onClick={ () => handleClearAllFilters() }
          data-testid="button-remove-filters"
        >
          Reset Filters
        </button>
      </fieldset>
      <fieldset>
        <legend>Used Filters</legend>
        { renderRemoveFilterButtons() }
      </fieldset>
      <fieldset>
        <legend>Ordenar Colunas</legend>
        <ComboBox
          name="operator-selector"
          value={ filterSortRadio.order.column }
          onChange={ ({ target: { value } }) => setFilterSortRadio(
            { order: { ...filterSortRadio.order, column: value } },
          ) }
          data={ SELECT_OPTIONS }
          data-testid="column-sort"
        />
        <span>
          ASC
        </span>
        <Input
          name="sort"
          type="radio"
          value="ASC"
          checked={ filterSortRadio.order.sort === 'ASC' }
          onChange={ ({ target: { value } }) => setFilterSortRadio(
            { order: { ...filterSortRadio.order, sort: value } },
          ) }
          data-testid="column-sort-input-asc"
        />
        <span>
          DESC
        </span>
        <Input
          name="sort"
          type="radio"
          value="DESC"
          checked={ filterSortRadio.order.sort === 'DESC' }
          onChange={ ({ target: { value } }) => setFilterSortRadio(
            { ...filterSortRadio, order: { ...filterSortRadio.order, sort: value } },
          ) }
          data-testid="column-sort-input-desc"
        />
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleClickSortFilter() }
        >
          Ordenar
        </button>
      </fieldset>
    </section>
  );
};

export default Forms;
