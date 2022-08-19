import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import useGetPlanets from '../hooks/useGetPlanets';

const SELECT_OPTIONS = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
function StarWarsProvider({ children }) {
  const [searchPlanet, setSearchPlanet] = useState('');

  const [numericFilterHeading, setNumericFilterHeading] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [numericFilter, setNumericFilter] = useState('0');

  const [selectOptions, setSelectOptions] = useState(SELECT_OPTIONS);

  const [isFilteredByNumber, setIsFilteredByNumber] = useState([]);

  const [filtersByNumbers, setFiltersByNumbers] = useState([]);

  const [planetData, setPlanetData, isLoading] = useGetPlanets();

  // const [filterOne, setFilterOne] = useState([]);
  // const [filterTwo, setFilterTwo] = useState([]);
  // const [filterThree, setFilterThree] = useState([]);
  // const [filterFour, setFilterFour] = useState([]);
  // const [filterFive, setFilterOFive] = useState([]);

  const applySearchFilter = (data) => data.filter(({ name }) => name
    .includes(searchPlanet));
  const lastIndex = -1;
  const data = searchPlanet ? applySearchFilter(planetData) : planetData;
  const data2 = filtersByNumbers.length ? filtersByNumbers.at(lastIndex) : data;

  useEffect(() => {
    // const populationFilter = isFilteredByNumber.at(lastArray).includes(SELECT_OPTIONS[0])
    //   ? setFilterOne(applyNumericFilter(data)) : [...data];
    // // console.log('1', populationFilter);

    // const orbitalPeriodFilter = isFilteredByNumber.includes(SELECT_OPTIONS[1])
    //   ? [...applyNumericFilter(populationFilter)] : [...populationFilter];
    // // console.log('2', orbitalPeriodFilter);

    // const diameterFilter = isFilteredByNumber.includes(SELECT_OPTIONS[2])
    //   ? [...applyNumericFilter(orbitalPeriodFilter)] : [...orbitalPeriodFilter];
    // // console.log('3', diameterFilter);

    // const rotationPeriodFilter = isFilteredByNumber.includes(SELECT_OPTIONS[3])
    //   ? [...applyNumericFilter(diameterFilter)] : [...diameterFilter];
    // // console.log('4', rotationPeriodFilter);

    // const surfaceWaterFilter = isFilteredByNumber.includes(SELECT_OPTIONS[4])
    //   ? [...applyNumericFilter(rotationPeriodFilter)] : [...rotationPeriodFilter];
    // // console.log('5', surfaceWaterFilter);

    console.log(filtersByNumbers);
  }, [isFilteredByNumber]);

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
    selectOptions,
    setFiltersByNumbers,
    filtersByNumbers,
    setSelectOptions,
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
