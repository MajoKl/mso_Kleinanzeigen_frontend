import { getBackend } from "../api.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const pushProduct = createAsyncThunk(
  "/aaapi/me",
  async () => await getBackend("/api/me/apiiii")
);
// const saveLocalStorage = (state) => {
//   const data = { product: state.product, status: state.status };
//   localStorage.setItem("newproductState", JSON.stringify(data));
// };

const initialState = {
  product: [],
  status: {
    severity: "",
    summary: "",
    detail: "",
    life: 0,
    stickyy: false,
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
    // addTodo(state, action) {
    //   const title = action.payload;
    //   state.todos.push({
    //     done: false,
    //     id: state.nextId,
    //     title: title,
    //     working: false,
    //   });
    //   state.nextId += 1;
    //   saveLocalStorage(state);
    // },
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
      state.product = payload;
      state.status.severity = "";
      console.log(payload);
    });
    //rejected: Error / denied / request failed
    builder.addCase(pushProduct.rejected, (state) => {
      state.product = null;
      state.status.severity = "error";
      state.status.summary = "Heavvy Error!";
      state.status.detail =
        "Request to Backend failed... Site cannot load. Please refresh";
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

// export const {
//   //   addTodo,
//   //   removeTodo,
//   //   toggleDone,
//   //   updateTitle,
//   //   editWorking,
//   //   loadFromStorage,
// } = newProductSlice.actions;
export default newProductSlice.reducer;
