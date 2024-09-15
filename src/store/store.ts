// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import monthReducer from './monthSlice';
import monthViewReducer from "./monthViewSlice"


const store = configureStore({
    reducer: {
        month: monthReducer,
        monthView: monthViewReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;