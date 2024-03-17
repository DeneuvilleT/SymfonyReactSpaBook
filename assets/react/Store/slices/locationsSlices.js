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
  },
});

export const { setLocations } = locationsSlice.actions;

export default locationsSlice.reducer;
