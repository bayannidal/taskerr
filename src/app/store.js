import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import taskReducer from '../features/tasks/taskSlice'
import taskerReducer from '../features/tasks/taskerSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    tasker: taskerReducer
  },
});
