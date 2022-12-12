import React, { useState } from 'react';
import DeleteAccountModal from '../../../../../Components/Components.Masud/DeleteAccountModal';
import ApproveAccountModal from '../../../../../Components/Components.Nahid/Modals/ApproveAccountModal';
import PendingAccountsRow from './PendingAccountsRow';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../../Components/Components.Nahid/Loading';

const PendingAccounts = () => {

    const [approveAccount, setApproveAccount] = useState(null);
    const [deleteAccount, setDeleteAccount] = useState(null);

    const allAccounts = () => axios.get('https://online-bank-of-bd-server-production.up.railway.app/allaccounts');

    const {isLoading, data , refetch} = useQuery(["accounts"], allAccounts);
  
    const accounts = data?.data;
  
    if(isLoading){
        return <Loading/>;
    }
  

    const upvAcc = accounts?.filter(account => account?.role !== 'approved');


    return (
        <div className=" text-left h-full w-full">

        <div className="w-full flex items-center justify-center my-12">
            <div className="bg-white shadow rounded py-12 px-8 mb-20">
            <p className="md:text-3xl text-xl font-bold pb-10 leading-7 text-center text-gray-700">Accounts in Review: {upvAcc?.length}</p>
                <table className="border-collapse w-full bg-slate-200">
                    {/* <!-- head --> */}
                    <thead>
                        <tr className='text-center'>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Index</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Name</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Acc No</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Balance</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Phone</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Country</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}

                        {
                            upvAcc?.map((account, index) =>
                                <PendingAccountsRow
                                    key={account._id}
                                    account={account}
                                    index={index}
                                    setApproveAccount={setApproveAccount}
                                    setDeleteAccount={setDeleteAccount}
                                    refetch={refetch}
                                ></PendingAccountsRow>)
                        }

                    </tbody>
                </table>
            </div>

            {
                approveAccount && <ApproveAccountModal approveAccount={approveAccount} refetch={refetch} ></ApproveAccountModal>
            }
            {
                deleteAccount && <DeleteAccountModal deleteAccount={deleteAccount} refetch={refetch} ></DeleteAccountModal>
            }

        </div>
        </div>
    );
};

export default PendingAccounts;