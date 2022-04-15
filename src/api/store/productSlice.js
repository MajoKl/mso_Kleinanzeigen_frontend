import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const saveLocalStorage = (state) => {
  //Hier ans Backend schicken
  //   const data = { products: state.products, nextId: state.nextId };
  //   localStorage.setItem("ProductState", JSON.stringify(data));
};

export const requestProducts =
  createAsyncThunk <
  Spotify >
  //Hier Backend anfragen
  ("spotify/requestSpotify", async () => await getSpotify());

//Was soll beim Start des Programmes gespeichert werden?
const initialState = {
  products: [
    //if getLocalStorage was drin ist, setzte das da rein, sonst das folgene als default nehmen!
  ],
  nextId: 1,
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
    builder.addCase(
      //Ruft Request Methode für Backend auf. Fulfilled is wenn es fertig ist
      requestProducts.fulfilled,
      (state, { payload }) => {
        //Setzt den Payload auf den State und ab gehts
        state.products = payload;
      }
    );
    builder.addCase(requestProducts.rejected, (state) => {
      //Throw fehler
      state.products = null;
    });
    //Hier gibts noch weitere wenn der noch lädt oder so
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
