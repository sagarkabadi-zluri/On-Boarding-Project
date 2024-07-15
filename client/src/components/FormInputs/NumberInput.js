// NumberInput.js
import React from 'react';

const NumberInput = ({ name, value, placeholder, onChange, error }) => (
  <div className="input-container">
    <input
      type="number"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required
      className={`expense-input ${error ? 'error' : ''}`}
    />
    {error && <div className="error-message">{error}</div>}
  </div>
);

export default NumberInput;
