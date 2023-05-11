import React from 'react'
import PropTypes from 'prop-types'

function TableRow({ data }) {
  // todo: remove data-testid
  return (
    <tr>
      <td data-testid="planet-name" data-cell="name">
        {data.name}
      </td>
      <td data-cell="rotation period">{data.rotation_period}</td>
      <td data-cell="orbital period">{data.orbital_period}</td>
      <td data-cell="diameter">{data.diameter}</td>
      <td data-cell="climate">{data.climate}</td>
      <td data-cell="gravity">{data.gravity}</td>
      <td data-cell="terrain">{data.terrain}</td>
      <td data-cell="surface water">{data.surface_water}</td>
      <td data-cell="population">{data.population}</td>
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
