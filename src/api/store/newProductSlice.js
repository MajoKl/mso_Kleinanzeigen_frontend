//React
// import React, { useRef, useEffect } from "react";
//Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { onlecke } from "../../components/UploadData.jsx";
//Api
import { postBackend } from "../api.js";
import axios from "axios";
// import ToastMessages from "../../components/ToastMessages.jsx";

// import { Toast } from "primereact/toast";

export const pushProduct = createAsyncThunk("/aaapi/me", async (data) => {
  const pics = data.pic;
  // const toast = useRef(null);
  
  const a = await postBackend(data.product);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/pictures/upload?article_id=${
        a._id
      }&name=${pics.name.split(".")[0]}`,
      pics.data,
      { withCredentials: true }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
    // toast.current.show({
    //   severity: "error",
    //   summary: "summary",
    //   detail: "detail",
    //   life: 3000,
    //   sticky: true,
    // });
    // <ToastMessages severity="error" summary="Picture Upload failed" detail="The pictures cannot send. Please update the product in another step." life="4000" />
    // ToastMessages({ severity:"error", summary:"Picture Upload failed", detail:"The pictures cannot send. Please update the product in another step.", life:"4000" });
  }
});

//Quelle: https://github.com/kuehnert/2021-informatik-pk + https://react-redux.js.org/ + https://redux-toolkit.js.org/introduction/getting-started
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
  pic: null,
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
    onPic(state, action) {
      const { value } = action.payload;
      state.pic = value;
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

export const {
  onChange,
  onChangeStatus,
  onChangeToast,
  onChangeToastMessage,
  onPic,
} = newProductSlice.actions;
export default newProductSlice.reducer;
