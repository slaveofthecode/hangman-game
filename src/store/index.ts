import { configureStore } from '@reduxjs/toolkit';
import playReducer from './features/playSlice';

const store = configureStore({
    reducer: {
        play: playReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
