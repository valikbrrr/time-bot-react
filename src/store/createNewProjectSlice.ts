import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CreateNewProjectState {
    selectedMonth: string | null;
}

const initialState: CreateNewProjectState = {
    selectedMonth: null,
};

const monthSlice = createSlice({
    name: 'month',
    initialState,
    reducers: {
        selectMonth: (state, action: PayloadAction<string>) => {
            state.selectedMonth = action.payload;
        },
        resetMonth: (state) => {
            state.selectedMonth = null;
        },
    },
});

export const { selectMonth, resetMonth } = monthSlice.actions;
export default monthSlice.reducer;