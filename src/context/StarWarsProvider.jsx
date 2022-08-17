import React from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import useGetPlanets from '../hooks/useGetPlanets';

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


function StarWarsProvider({ children }) {
  const [planetData, isLoading] = useGetPlanets();
  const context = {
    planetData,
    isLoading,
  }
  return (
    <StarWarsContext.Provider value={ context } >
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;