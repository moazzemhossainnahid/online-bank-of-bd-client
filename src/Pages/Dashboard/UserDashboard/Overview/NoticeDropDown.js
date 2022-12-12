
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';

const NoticeDropDown = ({notice}) => {
    const navigate = useNavigate()
    const [user]=useAuthState(auth);
    const [btnDisable,setBtnDisable]=useState(false)
    const handleNoticeRead=()=>{
        setBtnDisable(true)
        const prevEmail = notice?.readUsers;
        const newEmail = user?.email
        const readUsers=[ ...prevEmail, newEmail]
        const url = `https://online-bank-of-bd-server-production.up.railway.app/notice/read/${notice?._id}`;
        fetch(url,{
            method:"PATCH",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(readUsers)
        }).then(res=>res.json()).then(result=>{
            if(result){
                navigate("/notice")
                setBtnDisable(false)
            }
        })
    }
    return <><button disabled={btnDisable}  className='p-4 rounded-md my-2 bg-base-200 mx-2 text-start  text-xl text-bold font-mono' onClick={handleNoticeRead}> {notice?.title}</button> <hr/>   </>
};

export default NoticeDropDown;