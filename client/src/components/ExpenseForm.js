import React, { useState, useEffect } from "react";
import { createExpense, updateExpense } from "../api";
import { formatDate, updateFormatDate } from "../utils/formatDate";
import DateInput from "./FormInputs/DateInput";
import TextInput from "./FormInputs/TextInput";
import NumberInput from "./FormInputs/NumberInput";
import SelectInput from "./FormInputs/SelectInput";

const ExpenseForm = ({ expense, onFormSubmit, currencies, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    amount: "",
    currency: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (expense) {
      setFormData({
        ...expense,
        date: updateFormatDate(expense.date),
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Remove the error when the user changes the date
    if (name === "date" && errors.date) {
      const updatedErrors = { ...errors };
      delete updatedErrors.date;
      setErrors(updatedErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Form validations
    if (!formData.description.trim()) {
      validationErrors.description = "Description is required";
    }
    if (formData.amount <= 0) {
      validationErrors.amount = "Amount must be greater than 0";
    }
    if (new Date(formData.date) > new Date()) {
      validationErrors.date = "Date must not be in the future";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (expense) {
        await updateExpense(expense.id, formData);
      } else {
        formData.date = formatDate(formData.date);
        await createExpense(formData);
      }
      onFormSubmit();
      setFormData({
        date: "",
        description: "",
        amount: "",
        currency: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <DateInput
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
      />
      <TextInput
        name="description"
        value={formData.description}
        placeholder="Enter description"
        onChange={handleChange}
        error={errors.description}
      />

      <div className="">

      
      <SelectInput
        name="currency"
        value={formData.currency}
        onChange={handleChange}
        options={currencies}
        error={errors.currency}
      />
      <NumberInput
        name="amount"
        value={formData.amount}
        placeholder="Enter amount"
        onChange={handleChange}
        error={errors.amount}
      />

</div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 mx-2 rounded hover:bg-purple-700 transition duration-300"
        >
          {expense ? "Update" : "Create"} Expense
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
