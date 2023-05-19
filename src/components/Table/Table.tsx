import React, { useContext, useMemo } from 'react'
import FilterContext from '../../context/FilterContext'
import TableRow from '../TableRow/TableRow'
import filterDataByNumericValues from '../../helpers/filterDataByNumericValues'
import sortRenderData from '../../helpers/sortRenderData'
import useFetch from '../../hooks/useFetch'
import styles from './Table.module.scss'
import { FilterContextType, IPlanets } from '../../Types'

const SWAPI_ENDPOINTS = { planets: 'https://swapi.dev/api/planets' }

function Table() {
  const { searchPlanetValue, usedFiltersData, sortData } = useContext(
    FilterContext,
  ) as FilterContextType

  const [{ data, isLoading }] = useFetch(SWAPI_ENDPOINTS.planets)
  const planetData = useMemo(() => data?.results, [data]) as IPlanets[]

  const filteredData = useMemo<IPlanets[]>(
    () => filterDataByNumericValues(planetData, usedFiltersData),
    [planetData, usedFiltersData],
  )

  const renderData = useMemo<IPlanets[]>(
    () => (sortData ? sortRenderData(filteredData, sortData) : filteredData),
    [filteredData, sortData],
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <caption className={styles['table-caption']}>Star Wars Planets</caption>
        <thead>
          <tr>
            <th className={styles['header-cell']}>Name</th>
            <th className={styles['header-cell']}>Rotation Period</th>
            <th className={styles['header-cell']}>Orbital Period</th>
            <th className={styles['header-cell']}>Diameter</th>
            <th className={styles['header-cell']}>Climate</th>
            <th className={styles['header-cell']}>Gravity</th>
            <th className={styles['header-cell']}>Terrain</th>
            <th className={styles['header-cell']}>Surface Water</th>
            <th className={styles['header-cell']}>Population</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            renderData
              .filter(({ name }) => name.includes(searchPlanetValue))
              .map((planet) => <TableRow data={planet} key={planet.name} />)}
        </tbody>
        <tfoot>
          <tr>
            <td className={styles['table-footer']} colSpan={999}>
              Data collected from swapi.dev
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Table
