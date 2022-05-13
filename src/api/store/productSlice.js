//Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//Api
import { getBackend } from "../api.js";
// import { getProducts } from "../api.js";

export const requestProducts = createAsyncThunk(
  "/api/me/articles/",
  async (path) => await getBackend(path)
);

//Quelle: https://github.com/kuehnert/2021-informatik-pk + https://react-redux.js.org/ + https://redux-toolkit.js.org/introduction/getting-started
const initialState = {
  products: {
    products: {
      Name: "",
      detailtName: "",
      article_type: "",
      categories: "",
      count: 1,
      ISBN: "",
      basis_fornegotioations: [],
      price: 0,
      discription: "",
      _id: "",
    },
  },
  status: {
    severity: "",
    summary: "",
    detail: "",
    life: 0,
    sticky: false,
  },
  productsInfo: {
    count: 0,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //fulfilled
    builder.addCase(requestProducts.fulfilled, (state, { payload }) => {
      console.log("Fulfilled Product request");
      state.products = payload;
      state.status.severity = "";
    });
    //rejected: Error / denied / request failed
    builder.addCase(requestProducts.rejected, (state) => {
      //Errorhandling / Throw fehler
      state.products = null;
      state.status.severity = "error";
      state.status.summary = "Heavy Error!";
      state.status.detail =
        "Request to Backend failed... Site cannot load. Please refresh";
      state.status.life = 0;
      state.status.sticky = true;

      console.log("ERROR BEI PRODUCT-REQUEST");
    });
    //pending: Wartend, während dem request
    builder.addCase(requestProducts.pending, (state) => {
      //Pending Handling
      console.log("Product request pending");
    });
  },
});

export const {
  addTodo,
  removeTodo,
  toggleDone,
  updateTitle,
  editWorking,
  loadFromStorage,
} = productSlice.actions;
export default productSlice.reducer;
