import { configureStore } from "@reduxjs/toolkit";
//reducer
import bests from "./slices/bests";

export default configureStore({
  reducer: {
    bests
  },
});
