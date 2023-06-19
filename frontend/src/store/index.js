import {configureStore} from "@reduxjs/toolkit";
import habitReducer from "./slices/habitsSlice"
import userReducer from "./slices/userSlice"
import filterReducer from "./slices/filtersSlice"

export default configureStore({
    reducer: {
        habits: habitReducer,
        user: userReducer,
        filters: filterReducer
    }
})