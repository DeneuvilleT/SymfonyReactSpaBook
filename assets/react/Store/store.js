import { configureStore } from "@reduxjs/toolkit";

import addressesReducer from "./slices/addressesSlices";
import commentsReducer from "./slices/commentsSlices";
import ordersReducer from "./slices/ordersSlices";
import productsReducer from "./slices/productsSlices";
import notifReducer from "./slices/notifSlices";
import locationReducer from "./slices/locationsSlices";
import authReducer from "./slices/authSlices";
import cartReducer from "./slices/cartSlices";

export const store = configureStore({
  reducer: {
    notif: notifReducer,
    cart: cartReducer,
    auth: authReducer,
    location: locationReducer,
    addresses: addressesReducer,
    products: productsReducer,
    comments: commentsReducer,
    orders: ordersReducer,
  },
});
