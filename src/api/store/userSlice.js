//Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//Api
import { getBackend } from "../api.js";

export const requestUser = createAsyncThunk(
  "/aaaaapi/me",
  async (path) => await getBackend(path)
);

const setError = (state) => {
  state.status.severity = "error";
  state.status.summary = "Heavy Error!";
  state.status.detail =
    "Request to Backend failed... Site cannot load. Please refresh";
  state.status.life = 0;
  state.status.sticky = true;
};

const initialState = {
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addFavoriteorRemoveToUser(state, data) {
      const c = console.log;

      c("sike: " + data.payload);

      if (!state.user.favorites.includes(data.payload)) {
        state.user.favorites.push(data.payload);
      } else {
        state.user.favorites = state.user.favorites.filter(
          (e) => e !== data.payload
        );
      }
    },
  },

  extraReducers: (builder) => {
    //Fulfilled: Erfolgreich abgeschlossen
    builder.addCase(requestUser.fulfilled, (state, { payload }) => {
      console.log("Fulfilled User request");
      state.user = payload;
      state.status.summary = "success";
      console.log(payload);
    });
    //rejected: Error / denied / request failed
    builder.addCase(requestUser.rejected, (state) => {
      // state.user = null;
      state.user.role = "unauthorized";
      setError(state);
      console.log("ERROR BEI USER-REQUEST");
    });
    //pending: Wartend, während dem request
    builder.addCase(requestUser.pending, (state) => {
      console.log("User request pending");
    });
  },
});
export const { addFavoriteorRemoveToUser } = userSlice.actions;
export default userSlice.reducer;
