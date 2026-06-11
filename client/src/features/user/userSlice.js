
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import friendService from "./userService";

const initialState = {
  searchedUser: null,
  invites: [],
  friends: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// SEARCH USER
export const searchUser = createAsyncThunk(
  "friend/searchUser",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await friendService.searchUser(query, token);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// SEND REQUEST
export const sendRequest = createAsyncThunk(
  "friend/sendRequest",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await friendService.sendRequest(data, token);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ACCEPT REQUEST
export const acceptRequest = createAsyncThunk(
  "friend/acceptRequest",
  async (requestId, thunkAPI) => {
   
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await friendService.acceptRequest(requestId, token);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// REJECT REQUEST
export const rejectRequest = createAsyncThunk(
  "friend/rejectRequest",
  async (requestId, thunkAPI) => {
    console.log(requestId)
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await friendService.rejectRequest(requestId, token);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET MY INVITES
export const getInvites = createAsyncThunk(
  "friend/getInvites",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await friendService.getInvites(token);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const friendSlice = createSlice({
  name: "friend",
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    clearSearchUser: (state) => {
      state.searchedUser = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // SEARCH USER
      .addCase(searchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.searchedUser = action.payload.user;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;

        state.message = action.payload;
      })

      // SEND REQUEST
      .addCase(sendRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.message = action.payload.message;
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;

        state.message = action.payload;
      })

      // ACCEPT REQUEST
      .addCase(acceptRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.message = action.payload.message;

        // Remove accepted invite from pending invites
        state.invites = state.invites.filter(
          (invite) => invite._id !== action.meta.arg
        );
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;

        state.message = action.payload;
      })

          // REJECT REQUEST
      .addCase(rejectRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.message = action.payload.message;

        // Remove accepted invite from pending invites
        state.invites = state.invites.filter(
          (invite) => invite._id !== action.meta.arg
        );
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })


      // GET INVITES
      .addCase(getInvites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.invites = action.payload.invites;
      })
      .addCase(getInvites.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;

        state.message = action.payload;
      });
  },
});

export const { reset, clearSearchUser } = friendSlice.actions;

export default friendSlice.reducer;