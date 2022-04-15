import { combineReducers, configureStore } from "@reduxjs/toolkit";

import productReducer from "./productSlice";

//Reducer = Reduzieren den Aufwand für ka
export const rootReducer = combineReducers({
  products: productReducer,
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer,
});

export default store;
