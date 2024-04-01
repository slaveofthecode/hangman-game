import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { WORDS } from '../../data';

interface CommonState {
    error: string | null;
    loading: boolean;
    data: object;
}

interface PlayState extends CommonState {
    data: {
        words: string[] | null;
        maximumAttempts: number;
    };
}

const initialState: PlayState = {
    error: null,
    loading: false,
    data: {
        words: null,
        maximumAttempts: 6,
    },
};

export const getWords = createAsyncThunk('words/get', async () => {
    try {
        const response = await fetch('http://localhost:3000/words');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return Promise.resolve({
            error,
        });
    }
});

const playSlice = createSlice({
    name: 'play',
    initialState,
    reducers: {
        addNewWord: (state, action) => {
            state.data.words = [...(state.data.words ?? []), action.payload];
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
                console.log('[ getWords.fulfilled ]', action.payload);
                const words = action.payload as { word: string }[];

                state.loading = false;
                state.error = null;
                state.data.words = words.map((w) => w.word);
            })
            .addCase(getWords.rejected, (state, action) => {
                state.loading = false;
                state.data.words = null;
                state.error = action.payload as string;
            });
    },
});

export const { addNewWord } = playSlice.actions;

export default playSlice.reducer;
