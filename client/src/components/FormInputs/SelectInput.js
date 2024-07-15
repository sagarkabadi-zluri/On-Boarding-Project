// SelectInput.js
import React from 'react';

const SelectInput = ({ name, value, onChange, options, error }) => (
  <div className="input-container">
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className={`expense-input ${error ? 'error' : ''}`}
    >
      <option value="">Select Currency</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    {error && <div className="error-message">{error}</div>}
  </div>
);

export default SelectInput;
