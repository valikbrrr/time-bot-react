import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
    selectedProject: string | null;
}

const initialState: ProjectState = {
    selectedProject: null,
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        selectProject: (state, action: PayloadAction<string>) => {
            state.selectedProject = action.payload;
        },
        resetProject: (state) => {
            state.selectedProject = null;
        },
    },
});

export const { selectProject, resetProject } = projectSlice.actions;
export default projectSlice.reducer;