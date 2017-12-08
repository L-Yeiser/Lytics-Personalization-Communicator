import React from 'react';
import { string, bool, func } from 'prop-types';

const FormInput = ({ flagType, checked, onChange, label }) => {
  const update = event => onChange(flagType, event.target.checked);

  return (
    <div className="form-input">
      <input
        className="form-input__input"
        type="checkbox"
        checked={checked}
        onChange={update}
      />
      <label className="form-input__label" htmlFor={flagType}>
        {label}
      </label>
    </div>
  );
};

FormInput.propTypes = {
  flagType: string,
  checked: bool,
  onChange: func,
  label: string,
};

FormInput.defaultProps = {
  flagType: '',
  label: '',
  checked: false,
  onChange: () => {},
};

export default FormInput;
