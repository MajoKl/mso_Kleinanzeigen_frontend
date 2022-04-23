import { postBackend } from "../api.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const pushProduct = createAsyncThunk(
  "/aaapi/me",
  async (data) => await postBackend(data)
);
// const saveLocalStorage = (state) => {
//   const data = { product: state.product, status: state.status };
//   localStorage.setItem("newproductState", JSON.stringify(data));
// };

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
    pictures: [],
  },
  status: {
    severity: "",
    summary: "",
    detail: "",
    life: 0,
    sticky: false,
  },
};

const newProductSlice = createSlice({
  name: "newproduct",
  initialState,
  reducers: {
    // mit state kommt man an die daten ran (von product)
    // mit action holen wir uns die Daten darein
    // loadFromStorage(state) {
    //   //Hier vom Lokal Storage Daten bekommen!
    //   const json = localStorage.getItem("newproductState");
    //   if (json) {
    //     const data = JSON.parse(json);
    //     state.product = data.product;
    //     state.status = data.status;
    //   }
    // },
    onChange(state, action) {
      const { value, name } = action.payload;
      state.product[name] = value;
      // saveLocalStorage(state);
    },
    // removeTodo(state, action) {
    //   const id = action.payload;
    //   const index = state.todos.findIndex((i) => i.id === id);
    //   state.todos.splice(index, 1);
    //   saveLocalStorage(state);
    // },
    // toggleDone(state, action) {
    //   const id = action.payload;
    //   const todo = state.todos.find((i) => i.id === id);
    //   todo.done = !todo.done;
    //   saveLocalStorage(state);
    // },
    // editWorking(state, action) {
    //   const id = action.payload;
    //   const todo = state.todos.find((i) => i.id === id);
    //   todo.working = !todo.working;
    //   saveLocalStorage(state);
    // },
    // updateTitle(state, action) {
    //   const { id, title } = action.payload;
    //   const todo = state.todos.find((i) => i.id === id);
    //   todo.title = title;
    //   saveLocalStorage(state);
    // },
  },

  extraReducers: (builder) => {
    //Fulfilled: Erfolgreich abgeschlossen
    builder.addCase(pushProduct.fulfilled, (state, { payload }) => {
      console.log("Fulfilled NewProduct request");
      state.product = initialState.product;
      state.status.severity = "success";
      state.status.summary = "Anzeige erfolgreich aufgegeben!";
      state.status.detail =
        "Deine Anzeige wurde erfolgreich aufgegeben. Du bist bereit für den großen Verkauf!";
      state.status.life = 3000;
      state.status.sticky = false;
    });
    //rejected: Error / denied / request failed
    builder.addCase(pushProduct.rejected, (state, { payload }) => {
      console.log(payload);
      state.status.severity = "error";
      state.status.summary = "Heavvy Error!";
      state.status.detail =
        "Request to Backend failed... Please check your inputs and try again!";
      state.status.life = 0;
      state.status.sticky = true;
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
  // removeTodo,
  //   toggleDone,
  //   updateTitle,
  //   editWorking,
  //   loadFromStorage,
} = newProductSlice.actions;
export default newProductSlice.reducer;
