import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./reducer";

export const store = configureStore({
  reducer: {
    data: userReduser,
  },
  // middleware: getDefaultMiddleware =>
  //     getDefaultMiddleware({
  //         serializableCheck: false,
  //     }),
});
