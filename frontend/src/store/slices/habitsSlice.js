import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";
const headers = new Headers({
  "content-type": "application/json",
  authorization: localStorage.getItem("token"),
});

const baseUrl = "http://localhost:3010/api/habits";
const request = async (url, options) => {
    const res = await fetch(url, options);
    if (!res.ok)
        throw new Error("Couldn't fetch " + url);
    return await res.json();
}


const habitsAdapter = createEntityAdapter({
  selectId: (habit) => habit._id,
});

const initialState = habitsAdapter.getInitialState({
  status: null,
  error: null,
  user: null,
});

// проблема в несуществующем юзере
export const fetchHabits = createAsyncThunk(
  "habits/getHabits",
  async (state, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().user.user;
      const habits = await request(`${baseUrl}/${user._id}/allHabits`); //userа записать в стейт
      return habits;
    } catch (e) {
      rejectWithValue(e.message);
    }
  }
);

export const appendHabit = createAsyncThunk(
    "habits/appendHabit",
    async (habit, {rejectWithValue, dispatch, getState}) => {
        try{
            const {user} = getState().user.user
            const newHabit = await request(`${baseUrl}/${user._id}/habits/add`, {
                method: "POST",
                headers,
                body: JSON.stringify(habit)
            });
            dispatch(addHabit(newHabit));
        }
        catch(e) {
            rejectWithValue(e.message)
        }
    }
)

export const toggleHabit = createAsyncThunk(
  "habits/setHabitStatus",
  async ({ id, isCompleted }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { user } = getState().user.user;
      const data = await request(`${baseUrl}/${user._id}/habits/update/${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: isCompleted }),
      });
      
      console.log(data);
      dispatch(setHabitStatus({isCompleted, id}));
    } catch (e) {
      rejectWithValue(e.message);
    }
  }
);

export const deleteHabit = createAsyncThunk(
  "habits/deleteHabit",
  async (id, { rejectWithValue, dispatch, getState }) => {
    try{
        const { user } = getState().user.user;
        const info = await request(`${baseUrl}/${user._id}/habits/delete/${id}`, {
            method: "DELETE",
            headers
        })
        
        dispatch(removeHabit(id));
        return info;
    }
    catch(e) {
        rejectWithValue(e.message);
    }
  }
);

export const modifyHabit = createAsyncThunk(
    "habits/editHabit",
    async (habit, {getState, rejectWithValue, dispatch}) => {
        const {user} = getState().user.user
        const data = await request(`${baseUrl}/${user}/habits/edit`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(habit)
        });
        dispatch(editHabit(habit));
        return data;
    }
)

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit(state, action) {
      habitsAdapter.addOne(state, action.payload);
    },
    removeHabit(state, action) {
      habitsAdapter.removeOne(state, action.payload.id);
    },
    editHabit(state, action) {
      habitsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          name: action.payload.newName,
          description: action.payload.newDescription,
          filter: action.payload.newFilter,
        },
      });
    },
    setHabitStatus(state, action) {
      habitsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          isCompleted: action.payload.status,
        },
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.status = "resolved";
        console.log("проверяю payload", action.payload);
        if (action.payload) {
          habitsAdapter.setAll(state, action.payload);
        }
      })
      .addCase(fetchHabits.rejected, setError);
  },
});
const { selectAll } = habitsAdapter.getSelectors((state) => {
  return state.habits;
});

export const habitsSelector = createSelector((state) => state, selectAll);

export const { addHabit, removeHabit, editHabit, setHabitStatus, getHabits } =
  habitsSlice.actions;
export default habitsSlice.reducer;
