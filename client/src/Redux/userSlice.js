// import { createSlice } from "@reduxjs/toolkit";

// export const UserSlice= createSlice(
//     {
//         name:"user",
//         initialState:{
//             user:{}
//         }, 
//         reducers:{
//             login:(state, payloade)=>{
//                 state.user= payloade
//             },
//             logOut:(state, payloade)=>{
//                 state.user= {}
//             }
//         }
//     }
// )

// export const {login, logOut} = UserSlice.actions

// export default UserSlice.reducer


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logOut: (state) => {
      state.user = {};
    },
  },
});

export const { login, logOut } = UserSlice.actions;

export default UserSlice.reducer;