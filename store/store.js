import {configureStore} from '@reduxjs/toolkit';
import {cryptoApi} from '../services/cryptoApi';
import {cryptoNewsApi} from "../services/cryptoNewsApi";

export default configureStore({
    reducer: {
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
});