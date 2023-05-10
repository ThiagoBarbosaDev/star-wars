import { describe, expect } from 'vitest';
import App from '../App';
import { act, render, screen } from '@testing-library/react';
import mockFetch from './mocks/mockFetch';
import userEvent from '@testing-library/user-event'

describe('integration tests', () => {
  beforeEach(() => {
    global.fetch = vi.fn(mockFetch)
  })

  test('Search by type should filter accordingly', async () => {
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

  // test('I am your test', async () => {
  //   await act(() => render(<App />));
  //   await waitForElementToBeRemoved(() =>
  //     screen.getByText(/loading.../i),
  //   )

  //   const columns = screen.getAllByRole('row')
  //   expect(columns).toHaveLength(11)
    
  //   const headerComboBox = screen.getByTestId("column-filter");
  //   const operatorComboBox = screen.getByTestId("comparison-filter");
  //   const valueComboBox = screen.getByTestId("value-filter");
  //   const filterButton = screen.getByTestId("button-filter");
    
  //   userEvent.selectOptions(headerComboBox, 'surface_water');
  //   userEvent.selectOptions(operatorComboBox, 'igual a');
  //   userEvent.type(valueComboBox, '100');
  //   userEvent.click(filterButton);

  //   const resetAllFilter = screen.getByTestId('button-remove-filters')
  //   userEvent.click(resetAllFilter);
  //   const columnAfterReset = screen.getAllByRole('row')
  //   expect(columnAfterReset[1]).toHaveTextContent('Tatooine')
  // });

  // test('I am your test', async () => {
  //   await act(() => render(<App />));

  //   await waitForElementToBeRemoved(() =>
  //     screen.getByText(/loading.../i),
  //   )

  //   const radioButtons = screen.getAllByRole('radio');
  //   const sortButton = screen.getByTestId('column-sort-button');
  //   userEvent.click(sortButton);

  //   const columns = screen.getAllByRole('row')
  //   expect(columns).toHaveLength(11)
  //   expect(columns[1]).toHaveTextContent('Yavin IV')
  //   expect(columns[8]).toHaveTextContent('Coruscant')

  //   const sortComboBox = screen.getByTestId('column-sort')
  //   userEvent.click(radioButtons[1])
  //   userEvent.selectOptions(sortComboBox, 'surface_water');
  //   userEvent.click(sortButton);

  //   const columnsAfterSort = screen.getAllByRole('row')
  //   expect(columnsAfterSort[1]).toHaveTextContent('Kamino')
  //   expect(columnsAfterSort[9]).toHaveTextContent('Bespin')

  //   screen.debug();
  // });
});