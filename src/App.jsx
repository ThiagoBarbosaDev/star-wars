import React from 'react'
import './App.css'
import Forms from './components/Forms'
import Table from './components/Table'
import FilterProvider from './context/FilterProvider'

function App() {
  return (
    <FilterProvider>
      <Forms />
      <Table />
    </FilterProvider>
  )
}

export default App
