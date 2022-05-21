import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";
import taskService from "./taskService";

const initialState = {
    tasks: [],
    binnedTasks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createTask = createAsyncThunk(
    'task/insert',
    async (taskData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await taskService.createTask(taskData, token)
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



export const getTasks = createAsyncThunk('task/user', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await taskService.getTasks(token)
    } catch (error) {
        if (error.response.status === 403) {
            thunkAPI.dispatch(logout())
        }
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getBinnedTasks = createAsyncThunk('task/user/binned', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await taskService.getBinnedTasks(token)
    } catch (error) {
        if (error.response.status === 403) {
            thunkAPI.dispatch(logout())
        }
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const deleteBinnedTask = createAsyncThunk(
    'task/delete/binned',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await taskService.deleteBinnedTask(id, token)
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

export const updateTask = createAsyncThunk(
    'task/update',
    async (taskData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await taskService.updateTask(taskData, token)
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
export const trashTask = createAsyncThunk(
    'task/trash',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await taskService.trashTask(id, token)
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
export const restoreBinnedTask = createAsyncThunk(
    'task/restore',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await taskService.restoreBinnedTask(id, token)
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



export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.tasks.push(action.payload)
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = action.payload
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getBinnedTasks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBinnedTasks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.binnedTasks = action.payload
            })
            .addCase(getBinnedTasks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(trashTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(trashTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // state.binnedTasks = state.binnedTasks.push(state.tasks.find((task) => task.id === action.payload.id))
                state.tasks = state.tasks.filter(task => task.id !== action.payload.id)
            })
            .addCase(trashTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(deleteBinnedTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteBinnedTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.binnedTasks = state.binnedTasks.filter(binnedTasks => binnedTasks.id !== action.payload.id)
            })
            .addCase(deleteBinnedTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(restoreBinnedTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(restoreBinnedTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // state.binnedTasks = state.binnedTasks.push(action.payload)
            })
            .addCase(restoreBinnedTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                )

            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
    }
})


export const { reset } = taskSlice.actions
export default taskSlice.reducer