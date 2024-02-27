import tasksSlice from "./tasksSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
  },
});
export default store;
