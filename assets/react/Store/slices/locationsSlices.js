import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
  choiceLocation: false,
};

const locationsSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setOneLocation(state, action) {
      state.locations = [action.payload];
      state.choiceLocation = true;
    },
    setLocations(state, action) {
      state.locations = [...action.payload];
      state.choiceLocation = false;
    },
    deleteLocations(state, action) {
      state.locations = [];
      state.choiceLocation = false;
    },
  },
});

export const { setLocations, deleteLocations, setOneLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
