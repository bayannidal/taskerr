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
        console.log(message)
        return thunkApi.rejectWithValue(message)
    }
})

export const updateUser = createAsyncThunk(
    'user/edit',
    async (userData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await authService.updateUser(userData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const changePassword = createAsyncThunk('user/password/change', async (password, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.changePassword(password, token)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
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
                state.user = null
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
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })

    },
})
export const { reset } = authSlice.actions
export default authSlice.reducer