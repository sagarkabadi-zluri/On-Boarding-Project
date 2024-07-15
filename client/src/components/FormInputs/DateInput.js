// DateInput.js
import React from 'react';

const DateInput = ({ value, onChange, error }) => (
  <div className="input-container">
    <input
      type="date"
      name="date"
      value={value}
      onChange={onChange}
      required
      className={`expense-input ${error ? 'error' : ''}`}
    />
    {error && <div className="error-message">{error}</div>}
  </div>
);

export default DateInput;
