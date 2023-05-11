import React from 'react'
import PropTypes from 'prop-types'

function Button({ children, className, isSubmit, onClick, name, value }) {
  return (
    <button
      className={className}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
      name={name}
      value={value}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isSubmit: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
  children: null,
  className: null,
}

export default Button
