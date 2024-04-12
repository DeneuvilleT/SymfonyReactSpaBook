import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
  choiceLocation: false,
  privacy: null,
  datesChoices: localStorage.getItem("dates") ? localStorage.getItem("dates") : [],
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
    setDatesLocation(state, action) {
      state.datesChoices = action.payload;
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
      state.datesChoices = [];
      state.choiceLocation = false;
      state.privacy = null;
    },
  },
});

export const {
  setLocations,
  setOnPrivacy,
  setDatesLocation,
  resetPrivacy,
  deleteLocations,
  setOneLocation,
} = locationsSlice.actions;

export default locationsSlice.reducer;
