import { useEffect, useState } from 'react';

const useFilterData = (searchPlanet, planetData) => {
  const [getFilterData, setFilterData] = useState([]);

  useEffect(() => {
    const filterName = () => {
      setFilterData(() => planetData
        .filter((planet) => planet.name.includes(searchPlanet)));
    };
    filterName();
  }, [searchPlanet]);

  return [getFilterData, setFilterData];
};

export default useFilterData;
