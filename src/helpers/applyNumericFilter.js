const applyNumericFilter = (arrayOfObjects, filters) => {
  // console.log(filters);
  // console.log(arrayOfObjects);
  const { filterHeader, filterValue, filterOperator } = filters;
  const filteredData = arrayOfObjects.filter((object) => {
    const objectValue = object[filterHeader];
    const isValueKnown = objectValue !== 'unknown';
    if (isValueKnown) {
      const parsedObjectValue = parseInt(objectValue, 10);
      const parsedNumericFilter = parseInt(filterValue, 10);
      const parsedFilters = {
        'maior que': parsedObjectValue > parsedNumericFilter,
        'menor que': parsedObjectValue < parsedNumericFilter,
        'igual a': parsedObjectValue === parsedNumericFilter,
      };
      const isFilterTrue = parsedFilters[filterOperator];
      return isFilterTrue;
    } return false;
  });
  // console.log('função filtro', filteredData);
  return filteredData;
};

export default applyNumericFilter;
