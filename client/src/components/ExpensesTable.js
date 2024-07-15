import React, { useState } from "react";
import { formatDate } from "../utils/formatDate";
import Confirmation from "./Confirmation"; // Import the Confirmation component
import currencySymbols from "../constants/currencySymbol";

const ExpensesTable = ({ expenses, onDelete, onEdit }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleConfirmDelete = () => {
    onDelete(deleteId);
    setConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  const openConfirmation = (id) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  return (
    <div>
  {confirmDelete && (
    <Confirmation
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
    />
  )}
  <table className="expenses-table w-full border-collapse border border-gray-200">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 p-2 w-1/12">Date</th>
        <th className="border border-gray-300 p-2">Description</th>
        <th className="border border-gray-300 p-2 w-1/6">Amount</th>
        <th className="border border-gray-300 p-2 w-1/6">Amount (INR)</th>
        <th className="border border-gray-300 p-2 w-1/12">Actions</th>
      </tr>
    </thead>
    <tbody>
      {expenses.length === 0 ? (
        <tr>
          <td colSpan="5" className="p-4 text-gray-500 text-center">
            No records found
          </td>
        </tr>
      ) : (
        expenses.map((expense) => (
          <tr key={expense.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2">{formatDate(expense.date)}</td>
            <td className="border border-gray-300 p-2">{expense.description}</td>
            <td className="border border-gray-300 p-2">
              {currencySymbols[expense.currency] + " "}{expense.amount}
            </td>
            <td className="border border-gray-300 p-2">₹ {expense.amountinr}</td>
            <td className="border border-gray-300 p-2 flex justify-center space-x-2">
              <button onClick={() => onEdit(expense)}>✏️</button>
              <button onClick={() => openConfirmation(expense.id)}>🗑️</button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

  );
};

export default ExpensesTable;
