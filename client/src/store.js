import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth/authSlice"
import expense from "./features/expense/expenseSlice"
import group from "./features/group/groupSlice"
import user from "./features/user/userSlice"
import ai from "./features/ai/ai.Slice"




export const store = configureStore({
    reducer:{auth, expense,group,user,ai}
})