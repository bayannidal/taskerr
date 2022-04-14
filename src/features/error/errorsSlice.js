import { createSlice } from "@reduxjs/toolkit";
import { getTasks } from "../tasks/taskSlice";

export const errorsSlice = createSlice({
    name: 'errors',
    initialState: "",
    extraReducers: {
        [getTasks.pending]: () => "",
        [getTasks.rejected]: (state, action) => {
            // debugger
            return action
        }
    }
})

export const selectedErrors = state => state.errors
export default errorsSlice.reducer