import { createSlice, combineReducers } from "@reduxjs/toolkit";

const UpdateNavbar = createSlice({
  name: "Add Cart Slice",
  initialState: { data: "" },
  reducers: {
    UpdateNav: (state, action) => {
      //  console.log("action is :",action.payload);
      localStorage.setItem("token", action.payload);
      state.data = action.payload;
    },
    removeval: (state, action) => {
      state.data = action.payload;
      console.log("action is :",action.payload);
      localStorage.setItem("token", action.payload);
    },
  },
});

export const { UpdateNav, removeval } = UpdateNavbar.actions;

export default combineReducers({
  Nav: UpdateNavbar.reducer,
});
