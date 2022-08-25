import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import useGetPlanets from '../hooks/useGetPlanets';
import applyNumericFilter from '../helpers/applyNumericFilter';

const SELECT_OPTIONS = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function StarWarsProvider({ children }) {
  const [
    planetData, renderData, setRenderData, isLoading,
  ] = useGetPlanets();

  const [searchPlanetValue, setSearchPlanetValue] = useState('');

  const [filterHeader, setFilterHeader] = useState('population');
  const [filterOperator, setFilterOperator] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  const [usedFiltersData, setUsedFiltersData] = useState([]);

  const [selectOptions, setSelectOptions] = useState(SELECT_OPTIONS);

  useEffect(() => {
    const applyNumberFilter = (filters) => {
      setRenderData(planetData);
      filters.forEach((filter, index) => {
        const filteredData = !index
          ? applyNumericFilter(planetData, filter)
          : applyNumericFilter(renderData, filter);
        setRenderData(filteredData);
      });
    };
    applyNumberFilter(usedFiltersData);
  }, [usedFiltersData]);

  useEffect(() => {
    const notUsedFilterHeading = SELECT_OPTIONS
      .filter((option) => !usedFiltersData
        .some((filter) => filter.filterHeader === option));
    if (usedFiltersData.length) {
      setSelectOptions(notUsedFilterHeading);
      setFilterHeader(notUsedFilterHeading[0]);
    }
  }, [usedFiltersData]);

  const context = {
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
    isLoading,
    data: renderData,
    planetData,
    selectOptions,
    setSelectOptions,
    setRenderData,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
