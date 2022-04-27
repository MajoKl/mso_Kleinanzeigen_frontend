//Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//Api
import { getBackend } from "../api.js";
// import { getProducts } from "../api.js";

// const saveLocalStorage = (state) => {
//   //Hier ans Backend schicken
//   //   const data = { products: state.products, nextId: state.nextId };
//   //   localStorage.setItem("ProductState", JSON.stringify(data));
// };

//Wie kann ich hier path als Parameter übergeben?
export const requestProducts = createAsyncThunk(
  "/api/me/articles/undso",
  async (path) => await getBackend(path)
);

//Frage: Wie kann ich hier Parameter übergeben? Sodass ich im Component sagen kann hey, ich will startIndex und endIndex übergeben. Aber wie kommt das dann in die Api Anfrage rein?
// export const requestProducts = createAsyncThunk(
//   //So geht nicht: export const requestProducts = (start, end) = createAsyncThunk(
//   "/dwh",
//   async ({ start: startIndex, end: endIndex }) =>
//     await getProducts(startIndex, endIndex)
// );

//Was soll beim Start des Programmes gespeichert werden?
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
  //hier ist nur Datenveränderung, sonst nichts weiter!
  // funktionen, mit denen man den state manipuliert
  reducers: {
    //mit state kommt man an die daten ran (von product)
    //mit action holen wir uns die Daten darein
    //   loadFromStorage(state) {
    //     //Hier vom Backend Daten bekommen?
    //     const json = localStorage.getItem("ProductState");
    //     if (json) {
    //       const data = JSON.parse(json);
    //       state.todos = data.todos;
    //       state.nextId = data.nextId;
    //     }
    //   },
    //   addTodo(state, action) {
    //     const title = action.payload;
    //     state.todos.push({
    //       done: false,
    //       id: state.nextId,
    //       title: title,
    //       working: false,
    //     });
    //     state.nextId += 1;
    //     saveLocalStorage(state);
    //   },
    //   removeTodo(state, action) {
    //     const id = action.payload;
    //     const index = state.todos.findIndex((i) => i.id === id);
    //     state.todos.splice(index, 1);
    //     saveLocalStorage(state);
    //   },
    //   toggleDone(state, action) {
    //     const id = action.payload;
    //     const todo = state.todos.find((i) => i.id === id);
    //     todo.done = !todo.done;
    //     saveLocalStorage(state);
    //   },
    //   editWorking(state, action) {
    //     const id = action.payload;
    //     const todo = state.todos.find((i) => i.id === id);
    //     todo.working = !todo.working;
    //     saveLocalStorage(state);
    //   },
    //   updateTitle(state, action) {
    //     const { id, title } = action.payload;
    //     const todo = state.todos.find((i) => i.id === id);
    //     todo.title = title;
    //     saveLocalStorage(state);
    //   },
  },

  extraReducers: (builder) => {
    //Request Methoden für Backend
    //Fulfilled: Without an Error done
    builder.addCase(requestProducts.fulfilled, (state, { payload }) => {
      //Setzt den Payload auf den State und ab gehts
      console.log("Fulfilled Product request");
      state.products = payload;
      state.status.severity = "";
      console.log(payload);
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
      //Theoretisch könnte man irgendwo noch n spinner hinpacken aber zusammen mit dem tertären operator habe ich das mit den anderen Fällen nicht hinbekommen.
      //Pending Handling
      // state.status.severity = "whudhefkjbef";
      // const intervalId = setInterval(() => null, 3000);
      // return (
      //   <ProgressSpinner />
      //   // => clearInterval(intervalId);
      // );
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
