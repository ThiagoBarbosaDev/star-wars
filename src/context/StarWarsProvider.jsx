import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import { PLANETS_ENDPOINT } from '../env/endpoints';
import deleteProperty from '../helpers/deleteProperty';
import filterDataByNumericValues from '../helpers/filterDataByNumericValues';

const SELECT_OPTIONS = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
const SORT_INITIAL_STATE = { order: { column: 'population', sort: 'ASC' } };
const NUMERIC_FILTER_INPUTS_INITIAL_STATE = { column: 'population', operator: 'maior que', value: '0' };
function StarWarsProvider({ children }) {
  const [renderData, setRenderData] = useState([]);
  let filteredData = renderData

  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch(PLANETS_ENDPOINT);
      const data = await response.json();
      const filteredResponse = deleteProperty(data.results, 'residents');
      setRenderData(filteredResponse);
    };
    getPlanets();
  }, [])

  const [searchPlanetValue, setSearchPlanetValue] = useState('');

  // todo: merge these 3 usestates
  const [numericFilterInputs, setNumericFilterInputs] = useState(NUMERIC_FILTER_INPUTS_INITIAL_STATE);
  const [filterHeader, setFilterHeader] = useState('population');
  const [filterOperator, setFilterOperator] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');

  const [usedFiltersData, setUsedFiltersData] = useState([]);

  const [filterSortRadio, setFilterSortRadio] = useState(SORT_INITIAL_STATE);

  // todo: try to get rid of this unnecessary setstate
  const [dataFilteredBySort, setDataFilteredBySort] = useState([]);

  const [selectOptions, setSelectOptions] = useState(SELECT_OPTIONS);

  if (usedFiltersData.length) {
    filteredData = filterDataByNumericValues(renderData, usedFiltersData);
  }

  console.log('re-render');

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
      setNumericFilterInputs,
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
      dataFilteredBySort,
      numericFilterInputs,
    },
    data: filteredData,
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
