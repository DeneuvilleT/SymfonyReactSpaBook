import { createSlice } from "@reduxjs/toolkit";

const parseDates = (dates) => {
  if (!dates) return [];

  const datesArr = [];

  JSON.parse(dates).map((dateString) => {
    const parts = dateString.split(/[\/ :]/);
    const date = new Date(
      `${parts[2]}-${parts[1]}-${parts[0]} ${parts[3]}:${parts[4]}:${parts[5]}`
    );
    datesArr.push(date);
  });
  
  return datesArr;
};

const initialState = {
  locations: [],
  choiceLocation: false,
  privacy: null,
  datesChoices: parseDates(localStorage.getItem("dates")),
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
      state.datesChoices = parseDates(action.payload);
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
