import React from 'react'
import styles from './TableRow.module.scss'
import { IPlanets } from '../../Types'

type TableRowProps = {
  data: IPlanets
}

function TableRow({ data }: TableRowProps) {
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

export default TableRow
