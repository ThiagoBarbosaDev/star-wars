import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import useGetPlanets from '../hooks/useGetPlanets';
// import useFilterData from '../hooks/useFilterData';

// const HEADERS = {
//   Population: 'population',
//   'Orbital Period': 'orbital_period',
//   Diameter: 'diameter',
//   'Rotation Period': 'rotation_period',
//   'Surface Water': 'surface_water',
// };
function StarWarsProvider({ children }) {
  const [searchPlanet, setSearchPlanet] = useState('');
  const [numericFilterHeading, setNumericFilterHeading] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [numericFilter, setNumericFilter] = useState('0');
  const [isFilteredByNumber, setIsFilteredByNumber] = useState(false);

  const [planetData, setPlanetData, isLoading] = useGetPlanets();
  // const [getFilterData] = useFilterData(
  //   searchPlanet,
  //   planetData,
  //   setPlanetData,
  // );

  const applySearchFilter = (data) => data.filter(({ name }) => name
    .includes(searchPlanet));

  const applyNumericFilter = (arrayOfObjects) => {
    const filteredData = arrayOfObjects.filter((object) => {
      const objectValue = object[numericFilterHeading];
      const isValueKnown = objectValue !== 'unknown';
      if (isValueKnown) {
        const parsedObjectValue = parseInt(objectValue, 10);
        const parsedNumericFilter = parseInt(numericFilter, 10);
        const parsedFilters = {
          'maior que': parsedObjectValue > parsedNumericFilter,
          'menor que': parsedObjectValue < parsedNumericFilter,
          'igual a': parsedObjectValue === parsedNumericFilter,
        };
        console.log(parsedObjectValue);
        const isFilterTrue = parsedFilters[operator];
        return isFilterTrue;
      } return false;
    });
    return filteredData;
  };
  // const applyNumericFilter = (arrayOfObjects) => {
  //   const parsedHeading = HEADERS[numericFilterHeading];
  //   const filteredData = arrayOfObjects.filter((object) => {
  //     const objectValue = object[parsedHeading];
  //     const isValueKnown = objectValue !== 'unknown';
  //     if (isValueKnown) {
  //       const parsedObjectValue = parseInt(objectValue, 10);
  //       const parsedNumericFilter = parseInt(numericFilter, 10);
  //       const parsedFilters = {
  //         '>': parsedObjectValue > parsedNumericFilter,
  //         '<': parsedObjectValue < parsedNumericFilter,
  //         '=': parsedObjectValue === parsedNumericFilter,
  //       };
  //       const isFilterTrue = parsedFilters[operator];
  //       return isFilterTrue;
  //     } return false;
  //   });
  //   return filteredData;
  // };

  // const data = getFilterData.length ? getFilterData : planetData;
  const data = searchPlanet ? applySearchFilter(planetData) : planetData;
  const data2 = isFilteredByNumber ? applyNumericFilter(data) : data;

  const context = {
    setFilters: {
      setSearchPlanet,
      setNumericFilterHeading,
      setOperator,
      setNumericFilter,
      setIsFilteredByNumber,
    },
    getFilters: {
      searchPlanet,
      numericFilterHeading,
      operator,
      numericFilter,
      isFilteredByNumber,
    },
    setPlanetData,
    planetData,
    isLoading,
    data: data2,
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
