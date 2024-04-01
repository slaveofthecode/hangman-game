import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WORDS } from '../../data';

interface CommonState {
    error: string | null;
    loading: boolean;
    data: object;
}

interface PlayState extends CommonState {
    data: {
        words: string[] | null;
        maximumAttempts: number;
        gameIsOver: boolean;
    };
}

const initialState: PlayState = {
    error: null,
    loading: false,
    data: {
        words: null,
        maximumAttempts: 6,
        gameIsOver: false,
    },
};

export const getWords = createAsyncThunk('words/get', async () => {
    const response = await fetch('http://localhost:3000/words');
    const data = await response.json();
    return data;
});

export const postWords = createAsyncThunk(
    'words/post',
    async (word: string) => {
        const response = await fetch('http://localhost:3000/words', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word }),
        });
        const data = await response.json();
        return data;
    },
);

const playSlice = createSlice({
    name: 'play',
    initialState,
    reducers: {
        // addNewWord: (state, action) => {
        //     state.data.words = [...(state.data.words ?? []), action.payload];
        // },
        setGameIsOver: (state, action) => {
            state.data.gameIsOver = action.payload;
        },
    },
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
