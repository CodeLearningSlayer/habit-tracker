import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import { createEntityAdapter } from "@reduxjs/toolkit";

const headers = new Headers(
    {'content-type': 'application/json',
    'authorization': localStorage.getItem('token')});

const baseUrl = "http://localhost:3010/api/habits";

const habitsAdapter = createEntityAdapter({
    selectId: (habit) => habit._id
});

const initialState = habitsAdapter.getInitialState({
    status: null,
    error: null,
    user: null
});

// проблема в несуществующем юзере
export const fetchHabits = createAsyncThunk(
    "habits/getHabits",
    async (state, {rejectWithValue, getState}) => {
        try {
            const {user} = getState().user.user;
            const res = await fetch(`${baseUrl}/${user._id}/allHabits`) //userа записать в стейт
            if (!res.ok)
                throw new Error("Ошибка получения привычек")

            const {habits} = await res.json();
            return habits;
        }
        catch(e) {
            rejectWithValue(e.message);
        }
    }
)

const toggleHabit = createAsyncThunk(
    "habits/setHabitStatus",
    async (id, {rejectWithValue, dispatch, getState}) => {
        // const habit = getState().habits.habits.find(habit => habit._id === id);
        // console.log(habit);
    }
)

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
}

const habitsSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        addHabit(state, action){
            habitsAdapter.addOne(state, action.payload);
        },
        removeHabit(state, action){
            habitsAdapter.removeOne(state, action.payload.id);
        },
        editHabit(state, action){
            habitsAdapter.updateOne(state, {id: action.payload.id, changes: {
                name: action.payload.newName,
                description: action.payload.newDescription,
                filter: action.payload.newFilter
            }})
        },
        setHabitStatus(state, action) {
            habitsAdapter.updateOne(state, {id: action.payload.id, changes: {
                isCompleted: action.payload.status
            }
        })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHabits.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchHabits.fulfilled, (state, action) => {
                state.status = "resolved";
                console.log('проверяю payload', action.payload);
                if (action.payload) {
                    habitsAdapter.setAll(state, action.payload);
                }
            
            })
            .addCase(fetchHabits.rejected, setError)
    }
})
const {selectAll} = habitsAdapter.getSelectors(state => {
    return state.habits;
});


export const habitsSelector = createSelector(
    (state) => state,
    selectAll
)

export const {addHabit, removeHabit, editHabit, setHabitStatus, getHabits} = habitsSlice.actions;
export default habitsSlice.reducer;