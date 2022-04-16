import { getBackend } from "../api.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const requestUser = createAsyncThunk(
  "/aaaaapi/me",
  async () => await getBackend("/api/me")
);

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
  reducers: {},

  extraReducers: (builder) => {
    //Fulfilled: Erfolgreich abgeschlossen
    builder.addCase(requestUser.fulfilled, (state, { payload }) => {
      console.log("Fulfilled User request");
      state.user = payload;
      state.status.severity = "";
      console.log(payload);
    });
    //rejected: Error / denied / request failed
    builder.addCase(requestUser.rejected, (state) => {
      state.products = null;
      state.status.severity = "error";
      state.status.summary = "Heavy Error!";
      state.status.detail =
        "Request to Backend failed... Site cannot load. Please refresh";
      state.status.life = 0;
      state.status.sticky = true;

      console.log("ERROR BEI USER-REQUEST");
    });
    //pending: Wartend, während dem request
    builder.addCase(requestUser.pending, (state) => {
      console.log("User request pending");
    });
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
