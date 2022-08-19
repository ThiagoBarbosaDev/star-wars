const applyNumericFilter = (arrayOfObjects, numHeadingFilter, numFilter, operator) => {
  const filteredData = arrayOfObjects.filter((object) => {
    const objectValue = object[numHeadingFilter];
    const isValueKnown = objectValue !== 'unknown';
    if (isValueKnown) {
      const parsedObjectValue = parseInt(objectValue, 10);
      const parsedNumericFilter = parseInt(numFilter, 10);
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

export default applyNumericFilter;
