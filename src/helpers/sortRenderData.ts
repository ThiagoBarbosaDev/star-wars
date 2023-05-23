import { IPlanets, SortState } from '../Types'

const sortRenderData = (filteredData: IPlanets[], filterSortRadio: SortState) => {
  const { column, sort } = filterSortRadio.order
  const result = [...filteredData].sort((a, b) => {
    if (a[column] === 'unknown') {
      return 1
    }
    if (b[column] === 'unknown') {
      return -1
    }
    if (sort === 'ASC') {
      return Number(a[column]) - Number(b[column])
    }
    return Number(b[column]) - Number(a[column])
  })
  return result
}

export default sortRenderData
