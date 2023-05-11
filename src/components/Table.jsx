import React, { useContext, useMemo } from 'react'
import FilterContext from '../context/FilterContext'
import TableRow from './TableRow'
import filterDataByNumericValues from '../helpers/filterDataByNumericValues'
import sortRenderData from '../helpers/sortRenderData'
import useFetch from '../hooks/useFetch'

const SWAPI_ENDPOINTS = { planets: 'https://swapi.dev/api/planets' }

function Table() {
  const { searchPlanetValue, usedFiltersData, sortData } = useContext(FilterContext)

  const [{ data, isLoading }] = useFetch(SWAPI_ENDPOINTS.planets)
  const planetData = useMemo(() => data?.results, [data])

  const filteredData = useMemo(
    () => filterDataByNumericValues(planetData, usedFiltersData),
    [planetData, usedFiltersData]
  )

  const renderData = useMemo(
    () => (sortData ? sortRenderData(filteredData, sortData) : filteredData),
    [filteredData, sortData]
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            renderData
              .filter(({ name }) => name.includes(searchPlanetValue))
              .map(planet => <TableRow data={planet} key={planet.name} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Table
