import { combineReducers, configureStore } from "@reduxjs/toolkit";

import productReducer from "./productSlice";
import userReducer from "./userSlice";
// import newProductReducer from "./newProductSlice";

//Reducer = Reduzieren den Aufwand für ka
export const rootReducer = combineReducers({
  products: productReducer,
  user: userReducer,
  // newProduct: newProductReducer,
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer,
});

export default store;
