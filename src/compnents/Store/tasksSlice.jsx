import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    task: undefined,
    error: null,
    loading: false,
    style: true,
    message: false,
    status: [],
    label: [],
    labelFilter: [],
    keyword: {},
  },
  reducers: {
    loader(state) {
      state.loading = true;
    },
    addTask(state, action) {
      state.task = action.payload;
      state.loading = false;
    },
    styleChange(state) {
      state.style = !state.style;
    },
    messageChange(state, action) {
      state.message = action.payload;
    },
    statusChange(state, action) {
      const boolean = state.status.includes(action.payload);
      if (!boolean) {
        state.status.push(action.payload);
      } else {
        state.status = state.status.filter((el) => el !== action.payload);
      }
      if (action.payload === "clear") {
        state.status = [];
      }
    },
    labelChange(state, action) {
      const label = action.payload;
      if (label !== "Label") {
        const boolean = state.label.includes(label);
        if (!boolean) {
          state.label.push(label);
        }
      }
    },
    addQuery(state, action) {
      state.keyword =
        Object.keys(action.payload) === 0
          ? {}
          : {
              ...state.keyword,
              ...action.payload,
            };
    },
    labelClear(state) {
      state.label = [];
    },
    labelFilterChange(state, action) {
      const label = action.payload;
      const boolean = state.labelFilter.includes(label);
      if (!boolean) {
        state.labelFilter.push(label);
      } else {
        state.labelFilter = state.labelFilter.filter(
          (el) => el !== action.payload
        );
      }
    },
  },
});

export const addTask = tasksSlice.actions;
export default tasksSlice.reducer;
