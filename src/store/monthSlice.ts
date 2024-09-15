import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MonthState {
    selectedMonth: string | null;
}

const initialState: MonthState = {
    selectedMonth: null,
};

const monthSlice = createSlice({
    name: 'month',
    initialState,
    reducers: {
        selectMonth: (state, action: PayloadAction<string>) => {
            state.selectedMonth = action.payload;
            console.log(action.payload);
        },
        resetMonth: (state) => {
            state.selectedMonth = null;
        },
    },
});

export const { selectMonth, resetMonth } = monthSlice.actions;
export default monthSlice.reducer;