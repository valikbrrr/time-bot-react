// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import monthReducer from './monthSlice';
import projectReduser from "./projectSlice"
import monthViewReducer from "./monthViewSlice"
import projectViewReduser from "./projectViewSlice"


const store = configureStore({
    reducer: {
        month: monthReducer,
        project: projectReduser,
        monthView: monthViewReducer,
        projectView: projectViewReduser,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;