import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import applyNumericFilter from '../helpers/applyNumericFilter';
import Button from './Button';
import ComboBox from './ComboBox';
// import PropTypes from 'prop-types';
import Input from './Input';

// const SELECT_OPTIONS = ['Population',
//   'Orbital Period', 'Diameter', 'Rotation Period', 'Surface Water'];

// const SELECT_OPTIONS = ['population',
//   'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

// const OPERATORS = ['>', '<', '='];
const OPERATORS = ['maior que', 'menor que', 'igual a'];

const Forms = () => {
  const {
    setFilters: {
      setSearchPlanet,
      setNumericFilterHeading,
      setOperator,
      setNumericFilter,
      setUsedFilterHeadings,
    },
    getFilters: {
      searchPlanet,
      numericFilterHeading,
      operator,
      numericFilter,
      usedFilterHeadings,
    },
    selectOptions,
    setFiltersByNumbers,
    filtersByNumbers,
    data,
  } = useContext(StarWarsContext);

  const handleFilter = () => {
    setUsedFilterHeadings([...usedFilterHeadings, numericFilterHeading]);
    const areTherePreviousFilters = filtersByNumbers.length;
    const lastIndex = -1;
    const dataToFilter = areTherePreviousFilters ? filtersByNumbers.at(lastIndex) : data;
    const filteredData = applyNumericFilter(
      dataToFilter, numericFilterHeading, numericFilter, operator,
    );
    setFiltersByNumbers([...filtersByNumbers, filteredData]);
    // idéia para o requisito 6
    // const filteredOption = selectOptions
    //   .filter((option) => !option.includes(numericFilterHeading));
    // setSelectOptions(filteredOption);
  };

  return (
    <section>
      { !!usedFilterHeadings.length && <div> isfiltered by num </div> }
      <Input
        name="search-planet"
        type="text"
        value={ searchPlanet }
        onChange={ ({ target: { value } }) => setSearchPlanet(value) }
        data-testid="name-filter"
      >
        Search for a planet:
      </Input>
      <fieldset>
        <legend> Filter By </legend>
        <ComboBox
          name="numeric-selector"
          value={ numericFilterHeading }
          onChange={ ({ target: { value } }) => setNumericFilterHeading(value) }
          data={ selectOptions }
          data-testid="column-filter"
        />
        <ComboBox
          name="operator-selector"
          value={ operator }
          onChange={ ({ target: { value } }) => setOperator(value) }
          data={ OPERATORS }
          data-testid="comparison-filter"
        />
        <Input
          name="numeric-filter"
          type="number"
          value={ numericFilter }
          onChange={ ({ target: { value } }) => setNumericFilter(value) }
          data-testid="value-filter"
        />
        <Button
          data-testid="button-filter"
          onClick={ () => handleFilter() }
        >
          Search
        </Button>
      </fieldset>
    </section>
  );
};

// Forms.propTypes = {
// };

export default Forms;
