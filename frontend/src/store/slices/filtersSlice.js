import {createSlice} from "@reduxjs/toolkit";

const isEqSet = (xs, ys) =>
xs.size === ys.size &&
[...xs].every((x) => ys.has(x));

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        filters: [],
        activeFilter: "all"
    },
    reducers: {
        filterPressed: (state, action) => {
            state.activeFilter = action.payload;
            console.log(state.filters);
        },
        getFilters: (state, action) => {
            console.log(state);
            const {habits} = action.payload;
            let currFilters = new Set();
            if (habits && habits.length > 0)
                habits.forEach((habit) => {
                    currFilters.add(habit.filter)
                })
            if (!isEqSet(currFilters, new Set(state.filters))){
                state.activeFilter = "all";
            }
            const filtersArr = Array.from(currFilters);
            if (filtersArr.length > 0)
                state.filters = filtersArr;
        },
    }
})

export const {filterPressed, getFilters} = filtersSlice.actions;
export default filtersSlice.reducer;