import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { children, type, name, value, checked, ...otherProps } = this.props;
    return (
      <label htmlFor={ `form-${name}` }>
        { children }
        <input
          name={ name }
          id={ `form-${name}` }
          type={ type }
          value={ value }
          checked={ checked }
          { ...otherProps }
        />
      </label>
    );
  }
}

Input.propTypes = {
  children: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

Input.defaultProps = {
  checked: null,
};

export default Input;
