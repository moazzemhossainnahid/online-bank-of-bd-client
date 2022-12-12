
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from './Loading';

const RequireAccount = ({ children }) => {
    let location = useLocation();
    const [user, loading] = useAuthState(auth);
    const [acc,setAcc]=useState({});
    const [accountLoading,setAccountLoading]=useState(true);
    useEffect(()=>{
        setAccountLoading(true);
        fetch(`https://online-bank-of-bd-server-production.up.railway.app/accounts?email=${user?.email}`)
        .then(res=>{
            if(res.status=== 200){
                return res.json()
            }else{
                setAccountLoading(false);
            }
        })
        .then(result=>{
            if(result[0]?.role === 'approved'){
                setAcc(result[0]);
                // console.log(result);
                // console.log("authEmail",user?.email, "accountEmail", result[0]?.email);
                setAccountLoading(false)
            }

            setAccountLoading(false)
        })
    },[user])
    if (loading || accountLoading) {
      return <Loading />;
    }

    // console.log(acc);

    // const account = acc?.find(account => account?.role === 'approved');

    if (!acc && !accountLoading) {
        // console.log("i Am in ");
      return <Navigate to="/openaccount" state={{ from: location }} replace />;
    }
    return children;
  };
      
  export default RequireAccount;        