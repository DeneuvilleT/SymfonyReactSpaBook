import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
};

const locationsSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setOneLocation(state, action) {
      state.locations = [action.payload];
    },
    setLocations(state, action) {
      state.locations = [...action.payload];
    },
    deleteLocations(state, action) {
      state.locations = [];
    },
  },
});

export const { setLocations, deleteLocations, setOneLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
