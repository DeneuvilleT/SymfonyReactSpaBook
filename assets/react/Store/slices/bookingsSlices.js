import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  bookings: [],
  status: "idle",
  error: null,
};

export const fetchBookings = createAsyncThunk("bookings/fetchBookings", async (userId) => {
  const token = localStorage.getItem(`${location.origin}_bear_token`);
  try {
    const response = await axios.get(`/api/v1/bookings/load_bookings/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return [...response.data];
  } catch (err) {
    if (err.status === 401) {
      localStorage.removeItem(`${location.origin}_bear_token`);
      return location.href = '/';
    }
    return console.error(err.message);
  }
});

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    getBookings(state, action) {
      state.bookings.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookings.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedBookings = action.payload.map((booking) => {
          return booking;
        });
        state.bookings = loadedBookings;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getBookings } = bookingsSlice.actions;

export const getAllBookings    = (state) => state.bookings.bookings;
export const getBookingsErrors = (state) => state.bookings.error;
export const getBookingsStatus = (state) => state.bookings.status;

export default bookingsSlice.reducer;
