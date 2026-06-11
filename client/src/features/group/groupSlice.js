import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import groupService from "./groupService";

const initialState = {
  groups: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};


// CREATE GROUP
export const createGroup = createAsyncThunk(
  "group/create",
  async (groupData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await groupService.createGroup(groupData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);


// GET ALL GROUPS
export const getAllGroups = createAsyncThunk(
  "group/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await groupService.getAllGroups(token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// REMOVE GROUP
export const removeGroup = createAsyncThunk(
  "group/remove",
  async (groupId, thunkAPI) => {

    try {
      const token = thunkAPI.getState().auth.user.token;

      return await groupService.removeGroup(groupId, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const groupSlice = createSlice({
  name: "group",
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE GROUP
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.groups.push(action.payload.group);
      })

      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      // GET ALL GROUPS
      .addCase(getAllGroups.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.groups = action.payload.groups;
      })

      .addCase(getAllGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
          // REMOVE GROUP 
      .addCase(removeGroup.pending, (state) => {
        state.isLoading = true;
      })

    .addCase(removeGroup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
     state.message = action.payload;
    })

    .addCase(removeGroup.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

},
});

export const { reset } = groupSlice.actions;

export default groupSlice.reducer;