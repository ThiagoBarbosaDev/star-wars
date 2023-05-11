import React, { useContext } from 'react'
import StarWarsContext from '../context/StarWarsContext'
import TableRow from './TableRow'

function Table() {
  const {
    data,
    isLoading,
    getFilters: { searchPlanetValue },
  } = useContext(StarWarsContext)

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
            data
              .filter(({ name }) => name.includes(searchPlanetValue))
              .map(planet => <TableRow data={planet} key={planet.name} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Table
