import React from 'react'
import PropTypes from 'prop-types'

function ComboBox({ value, onChange, data, name, dataTestId, className }) {
  return (
    <select
      className={className}
      name={name}
      value={value}
      onChange={onChange}
      data-testid={dataTestId}
    >
      {data.map(option => (
        <option key={option}>{option}</option>
      ))}
    </select>
  )
}

// name="column"
// value={numericFilterInputs.column}
// onChange={event => onNumericFilterChange(event)}
// data={selectOptions}
// data-testid="column-filter"

ComboBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
}

ComboBox.defaultProps = {
  className: null,
  dataTestId: null,
  value: '',
}

export default ComboBox
