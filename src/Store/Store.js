import { configureStore } from '@reduxjs/toolkit'

import myTodo from '../Store/AddCartSlice'
import  addvalue  from "../Store/CartSlice";
import UpdateNavbar from './UpdateNavbar';

const store = configureStore({
    reducer: {
    
     myTodo,
     addvalue,
     UpdateNavbar,
    }
});


export default store;
