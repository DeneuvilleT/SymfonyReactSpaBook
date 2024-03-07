import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slides: [],
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    setSlider(state, action) {
      console.log(action.payload)
      state.slides = action.payload;
    },
    resetSlider(state, action) {
      state.slides = [];
    },
  },
});

export const { setSlider, resetSlider } = sliderSlice.actions;

export default sliderSlice.reducer;
