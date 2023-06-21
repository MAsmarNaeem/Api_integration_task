import { createSlice, combineReducers } from "@reduxjs/toolkit";


const storedItem = localStorage.getItem("itemadd");
const item = storedItem ? JSON.parse(storedItem) : [];

const Todo = createSlice({
  name: "Todo",
  initialState: { data: item },
  reducers: {
    addToCart: (state, action) => {
      state.data = [...state.data, action.payload];
      localStorage.setItem("itemadd", JSON.stringify(state.data));
    },
    removeToCart: (state, action) => {
      const index = state.data.findIndex((item) => item === action.payload);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
      localStorage.setItem("itemadd", JSON.stringify(state.data));
    },
  },
});

export const { addToCart, removeToCart } = Todo.actions;

export default combineReducers({
  Todo: Todo.reducer,
});
