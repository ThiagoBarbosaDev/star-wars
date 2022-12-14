import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import TableRow from './TableRow';

const Table = () => {
  const {
    isLoading,
    data,
    getFilters: {
      searchPlanetValue },
  } = useContext(StarWarsContext);

  const applySearchFilter = () => data
    .filter(({ name }) => name
      .includes(searchPlanetValue));

  const renderRows = () => applySearchFilter()
    .map((planetObject) => (
      <TableRow
        data={ planetObject }
        key={ planetObject.name }
      />
    ));

  if (isLoading) { return <div>Loading...</div>; }

  return (
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
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        { renderRows() }
      </tbody>
    </table>
  );
};

export default Table;
