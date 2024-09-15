import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MonthViewState {
    selectedMonthView: string | null;
}

const initialState: MonthViewState = {
    selectedMonthView: null,
};

const monthViewSlice = createSlice({
    name: 'monthView',
    initialState,
    reducers: {
        selectMonthView: (state, action: PayloadAction<string>) => {
            state.selectedMonthView = action.payload;
        },
        resetMonthView: (state) => {
            state.selectedMonthView = null;
        },
    },
});

export const { selectMonthView, resetMonthView } = monthViewSlice.actions;

export default monthViewSlice.reducer;