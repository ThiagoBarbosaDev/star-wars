import { useEffect, useState } from 'react';

const useFilterData = (getSearchPlanet, getPlanetData) => {
  const [getFilterData, setFilterData] = useState([]);

  useEffect(() => {
    const filterName = () => {
      console.log('filterName: ', getSearchPlanet, getPlanetData);
      setFilterData(() => getPlanetData
        .filter((planet) => planet.name.includes(getSearchPlanet)));
    };
    filterName();
  }, [getSearchPlanet]);

  return [getFilterData, setFilterData];
};

export default useFilterData;
