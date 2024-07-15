import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/expenses',
});

export const getExpenses = (page = 1) => api.get(`/p/${page}`);

export const getExpenseById = (id) => api.get(`/${id}`);

export const createExpense = (expense) => api.post('/', expense);

export const updateExpense = (id, expense) => api.put(`/${id}`, expense);

export const deleteExpense = (id) => api.delete(`/${id}`);

export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
