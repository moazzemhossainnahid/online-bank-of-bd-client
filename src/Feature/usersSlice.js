import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

export const fetchAllUsers = createAsyncThunk("users/fetchAllUsers", async () => {
    const [user] = useAuthState(auth);
    const allUsersLoadByEmail = await axios.get(`https://online-bank-of-bd-server-production.up.railway.app/accounts?email=${user?.email}`);
    return allUsersLoadByEmail.data;
})

const allUsersSlice  = createSlice({
    name: "users",
    initialState: {
        isLoading: false,
        error: null,
        reqLoan: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, (state)=> {
            state.isLoading = true ;
        });
        builder.addCase(fetchAllUsers.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload;
            state.reqLoan = [];
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action)=> {            
            state.isLoading = false;
            state.error = null;
            state.reqLoan = action.payload;
        });
    }
})

export default allUsersSlice.reducer;




