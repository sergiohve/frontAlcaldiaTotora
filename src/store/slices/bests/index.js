import { createSlice } from "@reduxjs/toolkit";
import Devices from "../../../services/Devices";

export const bestSlice = createSlice({
  name: "bests",
  initialState: {
    best: [],
  },
  reducers: {
    setBestList: (state, action) => {
      state.best = action.payload;
    },
    setBestError: (state) => {
      state.best = "No se cargo las información de best";
    },
  },
});

export const { setBestList, setBestError } = bestSlice.actions;
export default bestSlice.reducer;

export const fetchAllBest = () => async (distpach) => {
  try {
    const bests = await Devices.getBest();
    distpach(setBestList(bests.data.children));
   
  } catch (error) {
    distpach(setBestError());
  }
};
