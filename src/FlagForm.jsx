import React from 'react';
import { func, arrayOf, shape, bool, string } from 'prop-types';
import FormInput from './FormInput';

const FlagForm = ({ tours, canUpdate, updateTour, setTourFlag }) => (
  <form className="flag-form" onSubmit={setTourFlag}>
    <fieldset>
      <legend className="flag-form__legend">Activate Tour</legend>
      {tours.map(({ value, label, activate }) => (
        <FormInput
          key={value}
          label={label}
          flagType={value}
          checked={activate}
          onChange={updateTour}
        />
      ))}
      <button disabled={!canUpdate()} className="flag-form__submit" onClick={setTourFlag}>
        Update
      </button>
    </fieldset>
  </form>
);

export default FlagForm;

const tours = shape({
  value: string,
  label: string,
  activate: bool,
});

FlagForm.propTypes = {
  tours: arrayOf(tours),
  canUpdate: func,
  updateTour: func,
  setTourFlag: func,
};

FlagForm.defaultProps = {
  tours: [],
  canUpdate: () => {},
  updateTour: () => {},
  setTourFlag: () => {},
};
