import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    information: null,
  },

  reducers: {
    store: (state, action) => {
      state.information = action.payload;
    },

    remove: (state) => {
      state.information = null;
    },
  },
});

export const { store, remove } = userSlice.actions;

export default userSlice.reducer;
