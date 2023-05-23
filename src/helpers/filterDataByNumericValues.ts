import { IPlanets, NumericFilter } from '../Types'

const applyNumericFilter = (arrayOfObjects: IPlanets[], filters: NumericFilter) => {
  const { column, value, operator } = filters
  const filteredData = arrayOfObjects.filter((object) => {
    const objectValue = object[column]
    const isValueKnown = objectValue !== 'unknown'
    if (isValueKnown) {
      const parsedObjectValue = parseInt(objectValue, 10)
      const parsedNumericFilter = parseInt(value, 10)
      const parsedFilters = {
        'maior que': parsedObjectValue > parsedNumericFilter,
        'menor que': parsedObjectValue < parsedNumericFilter,
        'igual a': parsedObjectValue === parsedNumericFilter,
      }
      const isFilterTrue = parsedFilters[operator]
      return isFilterTrue
    }
    return false
  })
  return filteredData
}

const filterDataByNumericValues = (
  dataToBeFiltered: IPlanets[],
  usedFiltersData: NumericFilter[],
) =>
  usedFiltersData.reduce((accumulator, currentFilter) => {
    const result = applyNumericFilter(accumulator, currentFilter)
    return result
  }, dataToBeFiltered)

export default filterDataByNumericValues
