// ExpenseFormPopup.js
import React from 'react';
import ExpenseForm from './ExpenseForm';

const ExpenseFormPopup = ({ expense, currencies, onSubmit, onClose }) => (
  <div className="expense-form-popup">
    <div className="expense-form-container">
      <ExpenseForm expense={expense} currencies={currencies} onFormSubmit={onSubmit} onClose = {onClose} />
    </div>
  </div>
);

export default ExpenseFormPopup;
