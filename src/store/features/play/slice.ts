import { createSlice } from '@reduxjs/toolkit';
import { WORDS } from '../../../data';
import { PlayState } from './state';
import { reducers } from './reducers';
import { getWords, postWords } from './thunk';
import { MAXIMUM_ATTEMPTS } from '../../../enums';

const initialState: PlayState = {
    error: null,
    loading: false,
    data: {
        words: null,
        maximumAttempts: MAXIMUM_ATTEMPTS,
        gameIsOver: false,
    },
};

const playSlice = createSlice({
    name: 'play',
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder
            .addCase(getWords.pending, (state) => {
                state.data = { ...state.data, words: null };
                state.error = null;
                state.loading = true;
            })
            .addCase(getWords.fulfilled, (state, action) => {
                const words = action.payload as { word: string }[];

                state.loading = false;
                state.error = null;
                state.data.words = words.map((w) => w.word);
            })
            .addCase(getWords.rejected, (state, action) => {
                state.loading = false;
                state.data.words = WORDS;
                state.error = `Error fetching words : ${action.error.message}`;
            })
            .addCase(postWords.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postWords.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data.words = [...state.data.words!, action.payload.word];
            })
            .addCase(postWords.rejected, (state, action) => {
                state.loading = false;
                state.error = `Error adding word : ${action.error.message}`;
            });
    },
});

export const { setGameIsOver } = playSlice.actions;

export default playSlice.reducer;
