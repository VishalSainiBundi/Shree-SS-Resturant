import { createSlice } from "@reduxjs/toolkit";

export let CounterSlice= createSlice({

name:"count",
initialState:{
    count:0
},
reducers:{
    increment:(state, payload)=>{
        state.count+=1
    },

    decrement:(state, payload)=>{
        state.count-=1
    }
}

})

export const {increment,decrement} = CounterSlice.actions

export default CounterSlice.reducer
