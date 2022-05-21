import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1 },
    { id: 2 }
]

const taskerSlice = createSlice({
    name: "tasker",
    initialState,
    reducers: {

    }
})

export default taskerSlice.reducer