import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
};

const locationsSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocations(state, action) {
      state.locations = [...action.payload];
    },
    deleteLocations(state, action) {
      state.locations = [];
    },
  },
});

export const { setLocations, deleteLocations } = locationsSlice.actions;

export default locationsSlice.reducer;
