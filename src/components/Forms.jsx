import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import Button from './Button';
import ComboBox from './ComboBox';
import Input from './Input';

const OPERATORS = ['maior que', 'menor que', 'igual a'];

const Forms = () => {
  const {
    setFilters: {
      setSearchPlanetValue,
      setFilterHeader,
      setFilterOperator,
      setFilterValue,
      setUsedFiltersData,
    },
    getFilters: {
      searchPlanetValue,
      filterHeader,
      filterOperator,
      filterValue,
      usedFiltersData,
    },
    selectOptions,
    setRenderData,
  } = useContext(StarWarsContext);

  const handleFilter = () => {
    const filters = { filterHeader, filterValue, filterOperator };
    setUsedFiltersData([...usedFiltersData, filters]);
  };

  const handleClearAllFilters = () => {
    setUsedFiltersData([]);
    setRenderData([]);
  };

  const handleClearFilter = (header) => {
    const updatedFilterData = usedFiltersData
      .filter((item) => item.filterHeader !== header);
    setUsedFiltersData(updatedFilterData);
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
    </section>
  );
};

export default Forms;
