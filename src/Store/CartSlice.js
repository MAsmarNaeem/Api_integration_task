import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

const Todo = createSlice({
  name: "Todo",
   initialState: { todos: false },


  reducers: {
    addvalue: (state, action) => {
      
      if (action.payload === false) {
        return {
          todos: false,
        };
      } else
      return {
        todos: true,
      };
    },
    
   
  },
});

export const {  addvalue } = Todo.actions;

export default combineReducers({
  Todo: Todo.reducer,
});
