import { createSlice, combineReducers } from "@reduxjs/toolkit";
const item =
  localStorage.getItem("itemadd") !== null
    ? JSON.parse(localStorage.getItem("itemadd"))
    : 0;
console.log("my ddddddddd", item);

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
      console.log("index is ", index);
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
