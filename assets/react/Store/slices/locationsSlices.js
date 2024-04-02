import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
  choiceLocation: false,
  privacy: null,
};

const locationsSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setOneLocation(state, action) {
      state.locations = [action.payload];
      state.choiceLocation = true;
    },
    setOnPrivacy(state, action) {
      state.privacy = action.payload;
    },
    resetPrivacy(state, action) {
      state.privacy = null;
    },
    setLocations(state, action) {
      state.locations = [...action.payload];
      state.choiceLocation = false;
    },
    deleteLocations(state, action) {
      state.locations = [];
      state.choiceLocation = false;
      state.privacy = null;
    },
  },
});

export const {
  setLocations,
  setOnPrivacy,
  resetPrivacy,
  deleteLocations,
  setOneLocation,
} = locationsSlice.actions;

export default locationsSlice.reducer;
