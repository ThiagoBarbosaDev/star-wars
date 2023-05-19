import React from 'react'
import PropTypes from 'prop-types'
import styles from './TableRow.module.scss'

function TableRow({ data }) {
  // todo: remove data-testid
  return (
    <tr className={styles['data-row']}>
      <td className={styles['data-cell']} data-testid="planet-name" data-cell="name">
        {data.name}
      </td>
      <td className={styles['data-cell']} data-cell="rotation period">
        {data.rotation_period}
      </td>
      <td className={styles['data-cell']} data-cell="orbital period">
        {data.orbital_period}
      </td>
      <td className={styles['data-cell']} data-cell="diameter">
        {data.diameter}
      </td>
      <td className={styles['data-cell']} data-cell="climate">
        {data.climate}
      </td>
      <td className={styles['data-cell']} data-cell="gravity">
        {data.gravity}
      </td>
      <td className={styles['data-cell']} data-cell="terrain">
        {data.terrain}
      </td>
      <td className={styles['data-cell']} data-cell="surface water">
        {data.surface_water}
      </td>
      <td className={styles['data-cell']} data-cell="population">
        {data.population}
      </td>
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
