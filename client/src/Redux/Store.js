import { configureStore } from "@reduxjs/toolkit";
import  CounterSlice  from "./ConterSlice";
import  UserSlice from "./userSlice";

const store= configureStore({
reducer:{
    countStore: CounterSlice,
    userStore: UserSlice
}
})

export default store