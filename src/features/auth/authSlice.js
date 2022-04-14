import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
//Get user from localStorage

const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk('register', async (user, thunkApi) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || (error.message || error.toString()))
        return thunkApi.rejectWithValue(message)

    }
})


export const authenticate = createAsyncThunk('authenticate', async (user, thunkApi) => {
    try {
        return await authService.authenticate(user)
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || (error.message || error.toString()))
        return thunkApi.rejectWithValue(message)

    }
})

export const logout = createAsyncThunk('logout', async () => {
    authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(authenticate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
            })
            .addCase(authenticate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })

    },
})
export const { reset } = authSlice.actions
export default authSlice.reducer