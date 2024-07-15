import React, { useState, useEffect } from 'react';
import { getExpenses, deleteExpense } from '../api';
import currencies from '../constants/currencies'; 
import TopSection from './TopSection';
import ExpensesTable from './ExpensesTable';
import PaginationButtons from './PaginationButtons';
import ExpenseFormPopup from './ExpenseFormPopUp';
import UploadCSVPopup from './UploadCSVPopup';

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showExpenseForm, setShowExpenseForm] = useState(false); 
  const [showUploadCSV, setShowUploadCSV] = useState(false); 


  useEffect(() => {
    fetchExpenses(page);
  }, [page]);

  const fetchExpenses = async (page) => {
    setLoading(true);
    try {
      const { data } = await getExpenses(page);
      setExpenses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses(page);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowExpenseForm = () => {
    setSelectedExpense(null); 
    setShowExpenseForm(true); 
  };

  const handleHideExpenseForm = () => {
    setShowExpenseForm(false); 
  };

  const handleExpenseFormSubmit = () => {
    fetchExpenses(page);
    setSelectedExpense(null); 
    setShowExpenseForm(false); 
  };

  const handleShowUploadCSV = () => {
    setShowUploadCSV(true); 
  };

  const handleHideUploadCSV = () => {
    setShowUploadCSV(false); 
  };

  return (
    <div className="expenses-container">
      <TopSection onShowExpenseForm={handleShowExpenseForm} onShowUploadCSV={handleShowUploadCSV} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ExpensesTable
            expenses={expenses}
            onDelete={handleDelete}
            onEdit={(expense) => {
              setSelectedExpense(expense);
              setShowExpenseForm(true);
            }}
          />
          <PaginationButtons
            page={page}
            onPageChange={setPage}
            hasNextPage={expenses.length > 0} 
          />
        </>
      )}
      {showExpenseForm && (
        <ExpenseFormPopup
          expense={selectedExpense}
          currencies={currencies}
          onSubmit={handleExpenseFormSubmit}
          onClose={handleHideExpenseForm}
        />
      )}
      {showUploadCSV && (
        <UploadCSVPopup
          onUpload={() => fetchExpenses(page)}
          onClose={handleHideUploadCSV}
        />
      )}
    </div>
  );
};

export default ExpensesList;
 