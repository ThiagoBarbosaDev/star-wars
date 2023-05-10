import { expect } from 'vitest';
import { screen } from '@testing-library/react';

const sortColumns = async (user, { columnInput, operatorInput, valueInput }) => {
  const columnComboBox = screen.getByTestId("column-filter");
  const operatorComboBox = screen.getByTestId("comparison-filter");
  const valueComboBox = screen.getByTestId("value-filter");
  const filterButton = screen.getByTestId("button-filter");

  await user.selectOptions(columnComboBox, columnInput);
  expect(columnComboBox).toHaveValue(columnInput)
  
  await user.selectOptions(operatorComboBox, operatorInput);
  expect(operatorComboBox).toHaveValue(operatorInput)
  
  await user.clear(valueComboBox);
  await user.type(valueComboBox, valueInput);
  expect(valueComboBox).toHaveValue(Number(valueInput))

  await user.click(filterButton);
}

export default sortColumns