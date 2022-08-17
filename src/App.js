import React from 'react';
import './App.css';
import Forms from './components/Forms';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <Forms/>
      <Table/>
    </StarWarsProvider>
  );
}

export default App;
