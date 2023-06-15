import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import useHabitsAPI from '../../api/rest/habits';


const fetchHabits = createAsyncThunk(
    "habits/getHabits",
    async ({rejectWithValue, getState}) => {
        const user = getState().user.user;
        const {getHabits} = useHabitsAPI(user);
        const {habits} = await getHabits();
        return habits;
    }
)

const toggleHabit = createAsyncThunk(
    "habits/setHabitStatus",
    async (id, {rejectWithValue, dispatch, getState}) => {
        const habit = getState().habits.habits.find(habit => habit._id === id);
        const {setHabitCompleted} = useHabitsAPI
    }
)

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
}

const habitsSlice = createSlice({
    name: "habits",
    initialState: {
        habits: [],
        status: null,
        error: null
    },
    reducers: {
        addHabit(state, action){
            state.habits.push(action.payload.habit)
        },
        removeHabit(state, action){
            state.habits = state.habits.filter(habit => habit.id !== action.payload.id);
        },
        editHabit(state, action){
            const editingHabit = state.find(habit => habit.id = action.payload.id);
            editingHabit.name = action.payload.newName;
            editingHabit.description = action.payload.newDescription;
            editingHabit.filter = action.payload.newFilter;
        },
        setHabitStatus(state, action){
            const toggledHabit = state.habits.find(habit => habit.id === action.payload.id);
            toggledHabit.isCompleted = !toggledHabit.isCompleted;
        }
    },
    extraReducers: {
        [fetchHabits.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        }, // сделать лоадер
        [fetchHabits.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.habits = action.payload;
        },
        [fetchHabits.rejected]: setError
    }
})

export const {addHabit, removeHabit, editHabit, setHabitStatus, getHabits} = habitsSlice.actions;
export default habitsSlice.reducer;