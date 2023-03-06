import { createSlice } from "@reduxjs/toolkit";


let user_id = localStorage.getItem("user_id");

const initialValue = {
  user_id: user_id?user_id:'',
  isLoggedIn: user_id ? true : false,
};

export const dataSlice = createSlice({
  name: "dcbits",
  initialState: {
    value: initialValue,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      console.log(action,"ghghggh");
      // localStorage.setItem("user_email", action.payload.LoginDetails.email);
      localStorage.setItem("user_id",action.payload.user_id);
      state.value.user_id = action.payload.user_id;
      state.value.isLoggedIn = true;
    },
    logout: (state, action) => {
      localStorage.removeItem("user_id");
      state.value.user = {};
      state.value.isLoggedIn = false;
    },
  },
});

export const { setIsLoggedIn,logout } = dataSlice.actions;
export default dataSlice.reducer;


