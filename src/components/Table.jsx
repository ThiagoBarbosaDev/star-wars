import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';
import TableRow from './TableRow';

const Table = () => {
  const { getPlanetData, isLoading, data } = useContext(StarWarsContext);
  console.log(data, getPlanetData);

  const renderRows = () => data
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

// climate: "temperate"
// created: "2014-12-10T12:45:06.577000Z"
// diameter: "19720"
// edited: "2014-12-20T20:58:18.434000Z"
// films: ['https://swapi-trybe.herokuapp.com/api/films/5/']
// gravity: "1 standard"
// name: "Kamino"
// orbital_period: "463"
// population: "1000000000"
// rotation_period: "27"
// surface_water: "100"
// terrain: "ocean"
// url: "https://swapi-trybe.herokuapp.com/api/planets/10/"

// Table.propTypes = {
// };

export default Table;
