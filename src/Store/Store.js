import { configureStore } from '@reduxjs/toolkit'

import myTodo from '../Store/AddCartSlice'
import  addvalue  from "../Store/CartSlice";

const store = configureStore({
    reducer: {
    
     myTodo,
     addvalue,
    }
});


export default store;
