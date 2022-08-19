import { useEffect, useState } from 'react';

const useFilterData = (data, numericFilterHeading, numericFilter, operator) => {
  const [filterData, setFilterData] = useState([]);

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
        const isFilterTrue = parsedFilters[operator];
        return isFilterTrue;
      } return false;
    });
    return filteredData;
  };

  useEffect(() => {
    const filteredData = applyNumericFilter(data);
    setFilterData(filteredData);
    console.log(filterData);
  }, [searchPlanet]);

  return [filterData, setFilterData];
};

export default useFilterData;
