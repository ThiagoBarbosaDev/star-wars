import { expect } from 'vitest';
import { screen } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { NumericFilter } from '../../Types';

const sortColumns = async (user: UserEvent, { column, operator, value }: NumericFilter) => {
  const columnComboBox = screen.getByTestId("column-filter");
  const operatorComboBox = screen.getByTestId("comparison-filter");
  const valueComboBox = screen.getByTestId("value-filter");
  const filterButton = screen.getByTestId("button-filter");

  await user.selectOptions(columnComboBox, column);
  expect(columnComboBox).toHaveValue(column)
  
  await user.selectOptions(operatorComboBox, operator);
  expect(operatorComboBox).toHaveValue(operator)
  
  await user.clear(valueComboBox);
  await user.type(valueComboBox, value);
  expect(valueComboBox).toHaveValue(Number(value))

  await user.click(filterButton);
}

export default sortColumns