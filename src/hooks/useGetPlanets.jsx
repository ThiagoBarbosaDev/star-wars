import React, { useEffect, useState } from 'react';
import { PLANETS_ENDPOINT } from '../env/endpoints';

const useGetPlanets = (initialState = []) => {
  const [planetData, setPlanetData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const getPlanets = async () => {
      const data = await fetch(PLANETS_ENDPOINT);
      const response = await data.json();
      setPlanetData(response);
      setIsLoading(false);
    };
    getPlanets();
  },[])

  return [planetData, isLoading]
};

export default useGetPlanets;