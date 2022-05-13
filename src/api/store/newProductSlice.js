//Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//Api
import { postBackend } from "../api.js";

export const pushProduct = createAsyncThunk(
  "/aaapi/me",
  async (data) => await postBackend(data)
);

const initialState = {
  product: {
    Name: "",
    detailtName: "",
    article_type: "Ich biete",
    categories: "",
    count: 1,
    ISBN: "",
    basis_fornegotioations: [],
    price: 0,
    discription: "",
    _id: "",
  },
  status: {
    severity: "",
    summary: "",
    detail: "",
    life: 0,
    sticky: false,
  },
  toast: {
    setToast: false,
  },
};

const newProductSlice = createSlice({
  name: "newproduct",
  initialState,
  reducers: {
    onChange(state, action) {
      const { value, name } = action.payload;
      state.product[name] = value;
    },
    onChangeStatus(state) {
      state.status = initialState;
    },
    onChangeToast(state, action) {
      const value = action.payload;
      state.toast.setToast = value;
    },
    onChangeToastMessage(state, action) {
      const { value, name } = action.payload;
      state.status[name] = value;
    },
  },

  extraReducers: (builder) => {
    //Fulfilled: Erfolgreich abgeschlossen
    builder.addCase(pushProduct.fulfilled, (state, { payload }) => {
      state.product = initialState.product;
      state.toast.setToast = true;
      state.status.severity = "success";
      state.status.summary = "Anzeige erfolgreich aufgegeben!";
      state.status.detail =
        "Deine Anzeige wurde erfolgreich aufgegeben. Du bist bereit für den großen Verkauf!";
      state.status.life = 4000;
      state.status.sticky = false;
    });
    //rejected: Error / denied / request failed
    builder.addCase(pushProduct.rejected, (state, { payload }) => {
      state.toast.setToast = true;
      state.status.severity = "error";
      state.status.summary = "Heavvy Error!";
      state.status.detail =
        "Request to Backend failed... Please check your inputs and try again!";
      state.status.life = 10000;
      console.log("ERROR BEI NEWPRODUKT-REQUEST");
    });
    //pending: Wartend, während dem request
    builder.addCase(pushProduct.pending, (state) => {
      console.log("NewProduct request pending");
    });
  },
});

export const { onChange, onChangeStatus, onChangeToast, onChangeToastMessage } =
  newProductSlice.actions;
export default newProductSlice.reducer;
