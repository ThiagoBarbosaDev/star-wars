import React from 'react'
import PropTypes from 'prop-types'

function TableRow({ data }) {
  const {
    name,
    rotation_period: rotationPeriod,
    orbital_period: orbitalPeriod,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water: surfaceWater,
    population,
  } = data

  return (
    <tr>
      <td data-testid="planet-name" data-cell="name">
        {name}
      </td>
      <td data-cell="rotation period">{rotationPeriod}</td>
      <td data-cell="orbital period">{orbitalPeriod}</td>
      <td data-cell="diameter">{diameter}</td>
      <td data-cell="climate">{climate}</td>
      <td data-cell="gravity">{gravity}</td>
      <td data-cell="terrain">{terrain}</td>
      <td data-cell="surface water">{surfaceWater}</td>
      <td data-cell="population">{population}</td>
    </tr>
  )
}

TableRow.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rotation_period: PropTypes.string.isRequired,
    orbital_period: PropTypes.string.isRequired,
    diameter: PropTypes.string.isRequired,
    climate: PropTypes.string.isRequired,
    gravity: PropTypes.string.isRequired,
    terrain: PropTypes.string.isRequired,
    surface_water: PropTypes.string.isRequired,
    population: PropTypes.string.isRequired,
  }).isRequired,
}

export default TableRow
