import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
};

const locationsSlice = createSlice({
  name: "loation",
  initialState,
  reducers: {
    setLocations(state, action) {
      console.log(action)
    },
  },
});

export const { setLocations } = locationsSlice.actions;

export default locationsSlice.reducer;
