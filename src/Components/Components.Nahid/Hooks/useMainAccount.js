import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading';
import { useEffect } from 'react';


const useMainAccount = () => {
    const [mainAcc, setMainAcc] = useState();
    const allAccounts = () => axios.get('https://online-bank-of-bd-server-production.up.railway.app/allaccounts');

    const { isLoading, data, refetch } = useQuery(["accounts"], allAccounts);

    const accounts = data?.data;
    
        const apvAcc = accounts?.find(account => (account?.role === 'approved' && account?.actype === 'Main Account' && account?.AccNo === 777888999000));        
        useEffect(()=> {
            if(apvAcc){
                setMainAcc(apvAcc);
            }
        },[apvAcc])

    if (isLoading) {
        return <Loading />;
    }


    // console.log(accounts);

    return {mainAcc, refetch};
};

export default useMainAccount;