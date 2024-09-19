import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectViewState {
    selectedProjectView: string | null;
}

const initialState: ProjectViewState = {
    selectedProjectView: null,
};

const projectViewSlice = createSlice({
    name: 'projectView',
    initialState,
    reducers: {
        selectProjectView: (state, action: PayloadAction<string>) => {
            state.selectedProjectView = action.payload;
        },
        resetProjectView: (state) => {
            state.selectedProjectView = null;
        },
    },
});

export const { selectProjectView, resetProjectView } = projectViewSlice.actions;

export default projectViewSlice.reducer;