import axios from "axios";

const API_URL = "http://localhost:8080/api/expense";

// GET ALL EXPENSES
const getExpenses = async ( token) => {
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },

  };
 

  const response = await axios.get(
    `${API_URL}/All-expense`,
    config
  );

  return response.data;
};

// ADD EXPENSE
const addExpense = async (expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/add`, expenseData, config);

  return response.data;
};

// UPDATE EXPENSE
const updateExpense = async (expenseId, expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/update/${expenseId}`,
    expenseData,
    config
  );

  return response.data;
};

// DELETE EXPENSE
const deleteExpense = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/delete/${id}`, config);

  return response.data;
};

const expenseService = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};

export default expenseService;