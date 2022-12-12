import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllReqLoan = createAsyncThunk("loanReq/fetchAllReqLoan", async () => {
    const allReqLoan = await axios.get("https://online-bank-of-bd-server-production.up.railway.app/loanRequests");
    return allReqLoan.data;
})

const requestLoanSlice = createSlice({
    name: "loanReq",
    initialState: {
        isLoading: false,
        error: null,
        reqLoan: []
    },

    extraReducers: (builder) => {

        builder.addCase(fetchAllReqLoan.pending, (state)=> {
            state.isLoading = true ;
        });
        builder.addCase(fetchAllReqLoan.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload;
            state.reqLoan = [];
        });
        builder.addCase(fetchAllReqLoan.fulfilled, (state, action)=> {            
            state.isLoading = false;
            state.error = null;
            state.reqLoan = action.payload;
        });

    }
})

export default requestLoanSlice.reducer;


