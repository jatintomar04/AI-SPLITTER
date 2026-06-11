import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import aiService from "./ai.Service";

const initialState = {
  response: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const selfChat = createAsyncThunk(
  "ai/selfChat",
  async ({prompt}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await aiService.selfChat(prompt, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const groupChat = createAsyncThunk(
  "ai/groupChat",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await aiService.groupChat(data, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    reset: (state) => {
      state.response = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // SELF CHAT
      .addCase(selfChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(selfChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = action.payload;
      })
      .addCase(selfChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // GROUP CHAT
      .addCase(groupChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = action.payload;
      })
      .addCase(groupChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = aiSlice.actions;
export default aiSlice.reducer;