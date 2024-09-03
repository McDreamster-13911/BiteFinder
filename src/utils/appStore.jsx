import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cartSlice"

const appStore = configureStore({ 
    // This is the main big reducer for our app which in turn contains many smaller reducers
    reducer: {
        cart : cardReducer ,
    },

});

export default appStore;