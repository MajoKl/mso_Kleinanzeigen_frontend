import { getBackend } from "../api.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProgressSpinner } from "primereact/progressspinner";

const saveLocalStorage = (state) => {
  //Hier ans Backend schicken
  //   const data = { products: state.products, nextId: state.nextId };
  //   localStorage.setItem("ProductState", JSON.stringify(data));
};

export const requestProducts = createAsyncThunk(
  "/aaapi/me",
  async () => await getBackend("/api/me")
);

//Was soll beim Start des Programmes gespeichert werden?
const initialState = {
  products: [
    //if getLocalStorage was drin ist, setzte das da rein, sonst das folgene als default nehmen!
  ],

  user: {
    _id: "",
    name: "",
    grade: "",
    role: "",
    blocklist: [],
    friends: [],
    favorites: [],
    private: false,
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
  status: {
    severity: "",
    summary: "",
    detail: "",
    life: 0,
    sticky: false,
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
    loadFromStorage(state) {
      //Hier vom Backend Daten bekommen?
      const json = localStorage.getItem("ProductState");
      if (json) {
        const data = JSON.parse(json);
        state.todos = data.todos;
        state.nextId = data.nextId;
      }
    },
    addTodo(state, action) {
      const title = action.payload;
      state.todos.push({
        done: false,
        id: state.nextId,
        title: title,
        working: false,
      });
      state.nextId += 1;
      saveLocalStorage(state);
    },
    removeTodo(state, action) {
      const id = action.payload;
      const index = state.todos.findIndex((i) => i.id === id);
      state.todos.splice(index, 1);
      saveLocalStorage(state);
    },
    toggleDone(state, action) {
      const id = action.payload;
      const todo = state.todos.find((i) => i.id === id);
      todo.done = !todo.done;
      saveLocalStorage(state);
    },
    editWorking(state, action) {
      const id = action.payload;
      const todo = state.todos.find((i) => i.id === id);
      todo.working = !todo.working;
      saveLocalStorage(state);
    },
    updateTitle(state, action) {
      const { id, title } = action.payload;
      const todo = state.todos.find((i) => i.id === id);
      todo.title = title;
      saveLocalStorage(state);
    },
  },

  extraReducers: (builder) => {
    //Request Methoden für Backend
    //Fulfilled: Without an Error done
    builder.addCase(requestProducts.fulfilled, (state, { payload }) => {
      //Setzt den Payload auf den State und ab gehts
      state.user = payload;
      state.status.severity = "";
      console.log("LOL");
      console.log(payload, "GEIEIEIEILELLLLLLLLLL");
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

      console.log("NICHT GEILLLL");
    });
    //pending: Wartend, während dem request
    builder.addCase(requestProducts.pending, (state) => {
      //Theorethisch könnte man irgendwo noch n spinner hinpacken aber zusammen mit dem tertären operator habe ich das mit den anderen Fällen nicht hinbekommen.
      //Pending Handling
      //state.status.severity = "whudhefkjbef";
      // const intervalId = setInterval(() => null, 3000);
      // return (
      //   <ProgressSpinner />
      //   // => clearInterval(intervalId);
      // );
      console.log("In pending");
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
