import React from 'react'
import PropTypes from 'prop-types'

function Input({ children, type, name, value, checked, dataTestId, onChange }) {
  return (
    <label htmlFor={`form-${name}`}>
      {children}
      <input
        name={name}
        id={`form-${name}`}
        type={type}
        value={value}
        checked={checked}
        data-testid={dataTestId}
        onChange={onChange}
      />
    </label>
  )
}

Input.propTypes = {
  children: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  dataTestId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

Input.defaultProps = {
  checked: null,
  children: '',
  dataTestId: null,
}

export default Input
