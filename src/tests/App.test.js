import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockedData from "../../cypress/mocks/testData";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockedData),
    })
  );
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('I am your test', () => {
  test('I am your test', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() =>
      screen.getByText(/loading.../i),
    )

    const columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(11)
  
    
    const searchInput = screen.getByRole('textbox', { name: /search for a planet:/i })
    userEvent.type(searchInput, 'o')
    const tatooine = await screen.findByRole('cell', { name: /tatooine/i })
    const columnsAfterSearch = screen.getAllByRole('row')
    
    expect(columnsAfterSearch).toHaveLength(8)
    expect(tatooine).toBeInTheDocument();

    userEvent.type(searchInput, 'o')
    const naboo = await screen.findByRole('cell', { name: /naboo/i })
    expect(naboo).toBeInTheDocument();

    screen.logTestingPlaygroundURL()
  });
  test('I am your test', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() =>
      screen.getByText(/loading.../i),
    )

    const columns = screen.getAllByRole('row')
    expect(columns).toHaveLength(11)
    
    const headerComboBox = screen.getByTestId("column-filter");
    const operatorComboBox = screen.getByTestId("comparison-filter");
    const valueComboBox = screen.getByTestId("value-filter");
    const filterButton = screen.getByTestId("button-filter");
    
    userEvent.selectOptions(headerComboBox, 'surface_water');
    userEvent.selectOptions(operatorComboBox, 'igual a');
    userEvent.type(valueComboBox, '100');
    userEvent.click(filterButton);
    screen.logTestingPlaygroundURL()
  
    // const searchInput = screen.getByRole('textbox', { name: /search for a planet:/i })
    // userEvent.type(searchInput, 'o')
    // const tatooine = await screen.findByRole('cell', { name: /tatooine/i })
    // const columnsAfterSearch = screen.getAllByRole('row')
    
    // expect(columnsAfterSearch).toHaveLength(8)
    // expect(tatooine).toBeInTheDocument();

    // userEvent.type(searchInput, 'o')
    // const naboo = await screen.findByRole('cell', { name: /naboo/i })
    // expect(naboo).toBeInTheDocument();

  });
});
