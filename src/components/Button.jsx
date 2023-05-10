import React from 'react'
import PropTypes from 'prop-types'

function Button({ children, className, ...otherProps }) {
  return (
    <button className={className} type="button" {...otherProps}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

Button.defaultProps = {
  children: null,
  className: null,
}

export default Button
