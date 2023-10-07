import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery=fetchBaseQuery({baseUrl:''});

const apiSlices=createApi({
    baseQuery,
    tagTypes:['User'],
    endpoints:(bulider)=>({}),
});

export default apiSlices;
