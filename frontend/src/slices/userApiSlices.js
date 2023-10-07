import apiSlices from "./apiSlices";

const BseURL='api/users';

const userApiSlices=apiSlices.injectEndpoints({
    endpoints:(builder)=>({
        Login:builder.mutation({
            query:(data)=>({
                url:`${BseURL}/auth`,
                method:'POST',
                body:data,
            }),
        }),
        Register:builder.mutation({
            query:(data)=>({
                url:`${BseURL}`,
                method:'POST',
                body:data,
            }),
        }),
        Logout:builder.mutation({
            query:()=>({
                url:`${BseURL}/logout`,
                method:'POST',
            }),
        }),
        Update:builder.mutation({
            query:(data)=>({
                url:`${BseURL}/profile`,
                method:'PUT',
                body:data,
            }),
        }),
    }),
});

export const{useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateMutation}=userApiSlices;
