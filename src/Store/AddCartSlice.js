import { createSlice, combineReducers } from "@reduxjs/toolkit";


const storedItem = localStorage.getItem("itemadd");
const item = storedItem ? JSON.parse(storedItem) : [];
//name
const Todo = createSlice({
  name: "Add Cart Slice",
  initialState: { data: item },
  reducers: {
    addToCart: (state, action) => {
      state.data = [...state.data, action.payload];
      localStorage.setItem("itemadd", JSON.stringify(state.data));
    },
    removeFromCart: (state, action) => {
      const index = state.data.findIndex((item) => item === action.payload);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
      localStorage.setItem("itemadd", JSON.stringify(state.data));
    },
  },
});

export const { addToCart, removeFromCart } = Todo.actions;

export default combineReducers({
  Todo: Todo.reducer,
});
