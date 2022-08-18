import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import useGetPlanets from '../hooks/useGetPlanets';
import useFilterData from '../hooks/useFilterData';

function StarWarsProvider({ children }) {
  const [getSearchPlanet, setSearchPlanet] = useState('');
  const [getPlanetData, setPlanetData, isLoading] = useGetPlanets();
  const [getFilterData] = useFilterData(
    getSearchPlanet,
    getPlanetData,
    setPlanetData,
  );

  const data = getFilterData.length ? getFilterData : getPlanetData;

  const context = {
    setFilters: {
      setSearchPlanet,
    },
    getFilters: {
      getSearchPlanet,
    },
    setPlanetData,
    getPlanetData,
    isLoading,
    data,
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
