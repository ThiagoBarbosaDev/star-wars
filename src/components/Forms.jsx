import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
// import PropTypes from 'prop-types';
import Input from './Input';

const Forms = () => {
  const {
    setFilters: { setSearchPlanet },
    getFilters: { getSearchPlanet },
  } = useContext(StarWarsContext);

  return (
    <section>
      <Input
        name="searchPlanet"
        type="text"
        value={ getSearchPlanet }
        onChange={ ({ target: { value } }) => setSearchPlanet(value) }
        data-testid="name-filter"
      >
        Search for a planet:
      </Input>
    </section>
  );
};

// Forms.propTypes = {
// };

export default Forms;
