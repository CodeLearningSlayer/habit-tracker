import {configureStore} from "@reduxjs/toolkit";
import habitReducer from "./slices/habitsSlice"
import userReducer from "./slices/userSlice"

export default configureStore({
    reducer: {
        habits: habitReducer,
        user: userReducer
    }
})