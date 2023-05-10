import { describe, expect } from 'vitest';
import App from '../App';
import { act, render, screen } from '@testing-library/react';
import mockFetch from './mocks/mockFetch';
import userEvent from '@testing-library/user-event'
import addFilter from './utils/addFilter';

const UNSORTED_PLANETS = [
  'Tatooine',
  'Alderaan',
  'Yavin IV',
  'Hoth',
  'Dagobah',
  'Bespin',
  'Endor',
  'Naboo',
  'Coruscant',
  'Kamino',
]

const SORTED_PLANETS_ASC = [
  'Yavin IV',
  'Tatooine',
  'Bespin',
  'Endor',
  'Kamino',
  'Alderaan',
  'Naboo',
  'Coruscant',
  'Hoth',
  'Dagobah',
]

const SORTED_PLANETS_DESC = [
  'Kamino',
  'Hoth',
  'Alderaan',
  'Naboo',
  'Yavin IV',
  'Endor',
  'Dagobah',
  'Tatooine',
  'Bespin',
  'Coruscant'
]


describe('integration tests', () => {
  beforeEach(() => {
    global.fetch = vi.fn(mockFetch)
  })

  test('Search by name should filter accordingly', async () => {
    const user = userEvent.setup()
    await act(() => render(<App />));

    let columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(11)
  
    const searchInput = screen.getByRole('textbox', { name: /search for a planet:/i })
    await user.type(searchInput, 'o')
    expect(searchInput).toHaveValue('o')

    columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(8)

    await user.type(searchInput, 'o')
    columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(3)

    await user.type(searchInput, '{backspace}')
    columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(8)

    await user.type(searchInput, '{backspace}')
    columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(11)
  });
  
  test('Numeric filter should apply accordingly', async () => {
    const user = userEvent.setup()
    await act(() => render(<App />));

    let columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(11)

    const filterByDiameter = { columnInput: 'diameter', operatorInput: 'maior que', valueInput: '9000'}
    await addFilter(user, filterByDiameter)

    columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(8)

    const filterByPopulation = { columnInput: 'population', operatorInput: 'menor que', valueInput: '1000000'}
    await addFilter(user, filterByPopulation)

    columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(3)

    const filterByRotationPeriod = { columnInput: 'rotation_period', operatorInput: 'igual a', valueInput: '23'}
    await addFilter(user, filterByRotationPeriod)

    columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(2)

    const removeRotationPeriod = screen.getByRole('button', { name: /rotation_period/i })
    await user.click(removeRotationPeriod)
  
    columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(3)

    const removePopulation = screen.getByRole('button', { name: /population/i })
    await user.click(removePopulation)
  
    columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(8)

    const removeDiameter = screen.getByRole('button', { name: /diameter/i })
    await user.click(removeDiameter)
  
    columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(11)
  });

  test('Column sorting should work accordingly', async () => {
    const user = userEvent.setup()
    await act(() => render(<App />));

    let planets = screen.getAllByTestId('planet-name')
    planets.forEach((planet, index) => expect(planet).toHaveTextContent(UNSORTED_PLANETS[index]))

    const sortButton = screen.getByRole('button', { name: /ordenar/i })
    const ascSort = screen.getAllByRole('radio')[0];
    expect(ascSort).toBeChecked()
    await user.click(sortButton);

    planets = screen.getAllByTestId('planet-name')
    planets.forEach((planet, index) => expect(planet).toHaveTextContent(SORTED_PLANETS_ASC[index]))
    
    const descSort = screen.getAllByRole('radio')[1];
    await user.click(descSort)
    expect(descSort).toBeChecked()
    
    const sortComboBox = screen.getByTestId('column-sort')
    await user.selectOptions(sortComboBox, 'surface_water');
    expect(sortComboBox).toHaveValue('surface_water')
    await user.click(sortButton);

    planets = screen.getAllByTestId('planet-name')
    planets.forEach((planet, index) => expect(planet).toHaveTextContent(SORTED_PLANETS_DESC[index]))
    
    await user.click(ascSort)
    expect(ascSort).toBeChecked()
    await user.click(sortButton);

    // todo: test asc input and clear all filters button.
    // planets = screen.getAllByTestId('planet-name')
    // planets.forEach((planet, index) => expect(planet).toHaveTextContent(SORTED_PLANETS_ASC[index]))
  });
});