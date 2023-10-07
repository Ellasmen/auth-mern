import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlices.js'
import apiSlices from './slices/apiSlices.js';

const store= configureStore({
    reducer:{
        auth:authReducer,
        [apiSlices.reducerPath]:apiSlices.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlices.middleware),
    devTools:true
});

export default store;