import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

const Table = props => {
  const { planetData, isLoading } = useContext(StarWarsContext);
  if(isLoading) console.log(planetData);
  if (isLoading) { return <div>Loading...</div>}
  return (
    <div>
      Table
    </div>
  );
};

Table.propTypes = {
  
};

export default Table;