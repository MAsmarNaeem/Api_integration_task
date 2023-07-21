import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

const createSlicecart = createSlice({
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

export const {  addvalue } = createSlicecart.actions;

export default combineReducers({
  Todo: createSlicecart.reducer,
});
