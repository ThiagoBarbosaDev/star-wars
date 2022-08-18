import { useEffect, useState } from 'react';
import { PLANETS_ENDPOINT } from '../env/endpoints';
// import deleteProperties from '../helpers/deleteProperties';
import deleteProperty from '../helpers/deleteProperty';

const useGetPlanets = (initialState = []) => {
  const [planetData, setPlanetData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPlanets = async () => {
      const data = await fetch(PLANETS_ENDPOINT);
      const response = await data.json();
      // console.log(deleteProperties(response.results, ['residents', 'name', 'diameter']));
      const filteredResponse = deleteProperty(response.results, 'residents');
      setPlanetData(filteredResponse);
      setIsLoading(false);
    };
    getPlanets();
  }, []);

  return [planetData, setPlanetData, isLoading];
};

export default useGetPlanets;
