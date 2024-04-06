import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWordsAsync, postWordsAsync } from '../../../api/words';

export const getWords = createAsyncThunk('words/get', getWordsAsync);

export const postWords = createAsyncThunk('words/post', postWordsAsync);
