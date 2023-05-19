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
