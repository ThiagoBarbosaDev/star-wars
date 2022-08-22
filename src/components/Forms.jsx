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
      setUsedFilterHeadings,
      setUsedFiltersData,
    },
    getFilters: {
      searchPlanetValue,
      filterHeader,
      filterOperator,
      filterValue,
      usedFilterHeadings,
      usedFiltersData,
    },
    selectOptions,
    planetData,
    setRenderData,
  } = useContext(StarWarsContext);

  const handleFilter = () => {
    setUsedFilterHeadings([...usedFilterHeadings, filterHeader]);
    const filters = { filterHeader, filterValue, filterOperator };
    setUsedFiltersData([...usedFiltersData, filters]);
  };

  const handleClearAllFilters = () => {
    setUsedFilterHeadings([]);
    setUsedFiltersData([]);
    setRenderData([]);
  };

  const usedFilters = SELECT_OPTIONS
    .filter((option) => usedFilterHeadings
      .includes(option));

  const handleClearFilter = (header) => {
    const updatedHeading = usedFilterHeadings.filter((item) => item !== header);
    const updatedFilterData = usedFiltersData
      .filter((item) => item.filterHeader !== header);
    setUsedFiltersData(updatedFilterData);
    setUsedFilterHeadings(updatedHeading);
    setRenderData([...planetData]);
  };

  const renderRemoveFilterButtons = () => usedFilters
    .map((option) => (
      <div data-testid="filter" key={ option }>
        <button
          type="button"
          onClick={ () => handleClearFilter(option) }
        >
          {option}
        </button>
      </div>
    ));

  return (
    <section>
      { !!usedFilterHeadings.length && <div> isfiltered by num </div> }
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
