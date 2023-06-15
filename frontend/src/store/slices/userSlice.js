import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useUserAPI from "../../api/rest/user";

const baseUrl = "http://localhost:3010/api";
const headers = new Headers({
    'content-type': 'application/json',
    'authorization': localStorage.getItem('token')})

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (data, {rejectWithValue}) => {
        try {
            const result = fetch(`${baseUrl}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(data),
            });
            if (!result.ok) {
                throw new Error("Couldn`t register user")
            }
            const resData = await result.json();
            return resData;
        }
        catch(e) {
            rejectWithValue(e.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (data, {rejectWithValue}) => {
        const userObj = {
            username: data.login,
            password: data.password
        };
        try {
            const result = await fetch(`${baseUrl}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(userObj)
            })
            if (!result.ok) {
                throw new Error("Couldn't login");
            }
            const data = await result.json();
            if (data.token){
                localStorage.setItem('token', data.token);
                return data.user;
            }
        }
        catch(e) {
            rejectWithValue(e.message);
        }

    }
)

export const getMe = createAsyncThunk(
    "user/getMe",
    async (_, {rejectWithValue}) => {
        try {
            const res = await fetch(`${baseUrl}/auth/me`, {
                method: "GET",
                headers
            });
            if (!res.ok) {
                throw new Error('couldn`t fetch')
            }
            const data = await res.json();
            return data;
        }
        catch(e) {
            rejectWithValue(e.message);
        }
    }
)

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
    console.log(action.payload);
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        status : null,
        error: null
    },
    reducers: {
        
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.user = action.payload;
        },
        [loginUser.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.user = action.payload;
        },
        [getMe.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [getMe.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.user = action.payload;
        },
        [registerUser.rejected]: setError,
        [loginUser.rejected]: setError,
        [getMe.rejected]: setError
    }
})

export default userSlice.reducer;

