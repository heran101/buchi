import { configureStore } from "@reduxjs/toolkit";
import MapReducer from "./Slices/MapSlice";

export const store = configureStore({
  reducer: {
    map: MapReducer,
  },
});
