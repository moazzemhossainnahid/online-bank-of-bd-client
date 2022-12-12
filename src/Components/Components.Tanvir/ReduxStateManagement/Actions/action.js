import axios from "axios"
import { USER_ACCOUNT_FAILED, USER_ACCOUNT_REQUEST, USER_ACCOUNT_SUCCESS } from "../Constant/Constant"

export  const getUserAccount = (email)=> async (dispatch)=>{
   try {
    dispatch({type:USER_ACCOUNT_REQUEST})
    const res =await  axios.get(`https://online-bank-of-bd-server-production.up.railway.app/accounts?email=${email}`)
    dispatch({type:USER_ACCOUNT_SUCCESS, payload:res.data})
   } catch (error) {
    dispatch({type:USER_ACCOUNT_FAILED, payload: error.message})
   }
}