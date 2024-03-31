import { createSlice } from '@reduxjs/toolkit';
import { WORDS } from '../../data';

interface PlayState {
    words: string[];
    maximumAttempts: number;
}

const initialState: PlayState = {
    words: WORDS,
    maximumAttempts: 6,
};

const playSlice = createSlice({
    name: 'play',
    initialState,
    reducers: {
        addNewWord: (state, action) => {
            state.words.push(action.payload);
        },
    },
});

export const { addNewWord } = playSlice.actions;

export default playSlice.reducer;
