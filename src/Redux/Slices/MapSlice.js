import { createSlice } from "@reduxjs/toolkit";

const initialState = { Features: { addressList: [] } };

export const MapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    addFeatures: (state, action) => {
      state.Features = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFeatures } = MapSlice.actions;

export default MapSlice.reducer;
