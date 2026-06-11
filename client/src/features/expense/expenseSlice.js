import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import expenseService from "./expenseService";

const initialState = {
  expenses: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// GET ALL EXPENSES
export const getExpenses = createAsyncThunk(
  "expense/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await expenseService.getExpenses(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ADD EXPENSE
export const addExpense = createAsyncThunk(
  "expense/add",
  async (expenseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await expenseService.addExpense(expenseData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// UPDATE EXPENSE
export const updateExpense = createAsyncThunk(

  "expense/update",
  async ({ expenseId, expenseData }, thunkAPI) => {

    try {
      const token = thunkAPI.getState().auth.user.token;

      return await expenseService.updateExpense(
        expenseId,
        expenseData,
        token
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// DELETE EXPENSE
export const deleteExpense = createAsyncThunk(
  "expense/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await expenseService.deleteExpense(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,

  reducers: {
    resetExpenseState: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // ADD
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // UPDATE
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })

      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
  },
});

export const { resetExpenseState } = expenseSlice.actions;

export default expenseSlice.reducer;