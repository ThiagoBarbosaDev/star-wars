import { useEffect, useState } from 'react';
import { PLANETS_ENDPOINT } from '../env/endpoints';
import deleteProperty from '../helpers/deleteProperty';

const useGetPlanets = (initialState = []) => {
  const [getPlanetData, setPlanetData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPlanets = async () => {
      const data = await fetch(PLANETS_ENDPOINT);
      const response = await data.json();
      const filteredResponse = deleteProperty(response.results, 'residents');

      setPlanetData(filteredResponse);
      setIsLoading(false);
    };
    getPlanets();
  }, []);

  return [getPlanetData, setPlanetData, isLoading];
};

export default useGetPlanets;
