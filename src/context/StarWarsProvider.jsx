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
  const [usedFilterHeadings, setUsedFilterHeadings] = useState([]);

  useEffect(() => {
    const applySearchFilter = (unfilteredData, searchFilterQuery) => unfilteredData
      .filter(({ name }) => name
        .includes(searchFilterQuery));

    const filteredData = searchPlanetValue
      ? applySearchFilter(renderData, searchPlanetValue)
      : planetData;
    setRenderData(filteredData);
  }, [searchPlanetValue]);

  useEffect(() => {
    const applyNumberFilter = (unfilteredData, filters) => {
      filters.forEach((filter) => {
        const filteredData = (applyNumericFilter(unfilteredData, filter));
        setRenderData(filteredData);
      });
    };
    console.log(renderData);
    applyNumberFilter(renderData, usedFiltersData);
  }, [usedFilterHeadings]);
  // }, [usedFiltersData]);

  useEffect(() => {
    const notUsedFilterHeading = SELECT_OPTIONS
      .filter((option) => !usedFilterHeadings.includes(option));
    if (usedFilterHeadings) { setSelectOptions(notUsedFilterHeading); }
    if (usedFilterHeadings) { setFilterHeader(notUsedFilterHeading[0]); }
  }, [usedFilterHeadings]);

  const data = renderData.length ? renderData : planetData;

  const context = {
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
    isLoading,
    data,
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
