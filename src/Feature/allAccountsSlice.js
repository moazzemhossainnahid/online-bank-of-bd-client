import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllAccounts = createAsyncThunk('allAccunts/fetchAllAccounts', async () => {    
    const allAccounts = await axios.get('https://online-bank-of-bd-server-production.up.railway.app/allAccounts');
    return allAccounts.data;
})

const allAccountsSlice = createSlice({
    name: "allAccunts",
    initialState: {
        isLoading: false,
        error: null,
        allAccounts: []
    },

    extraReducers: builder => {
        builder.addCase(fetchAllAccounts.pending, (state)=> {
            state.isLoading = true ;
        });
        builder.addCase(fetchAllAccounts.rejected, (state, action)=> {
            state.isLoading = false ;
            state.error = action.payload;
            state.allAccounts = [];
        });
        builder.addCase(fetchAllAccounts.fulfilled, (state, action)=> {
            state.isLoading = false ;
            state.error = null ;
            state.allAccounts = action.payload;
        });
    }
});

export default allAccountsSlice.reducer;