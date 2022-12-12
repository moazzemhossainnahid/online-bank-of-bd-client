import { faPersonArrowUpFromLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteAccountModal from '../../../../Components/Components.Masud/DeleteAccountModal';
import DepositModal from '../../../../Components/Components.Masud/DepositModal';
import WidthdrawModal from '../../../../Components/Components.Masud/WidthdrawModal';
import Loading from '../../../../Components/Components.Nahid/Loading';
import AccountsRow from './AccountsRow';

const ManageAccounts = () => {

    const [deposit, setDeposit] = useState(null);
    const [withdraw, setWithdraw] = useState(null);
    const [deleteAccount, setDeleteAccount] = useState(null);

    const allAccounts = () => axios.get('https://online-bank-of-bd-server-production.up.railway.app/allaccounts');

    const { isLoading, data, refetch } = useQuery(["accounts"], allAccounts);

    const accounts = data?.data;

    if (isLoading) {
        return <Loading />;
    }



    const apvAcc = accounts?.filter(account => account?.role === 'approved');
    const upvAcc = accounts?.filter(account => account?.role !== 'approved');

    // console.log(apvAcc);

    return (
        <div className=" text-left h-full w-full">

            <div className="w-full flex items-center justify-center my-12">
                <div className="bg-white shadow rounded py-12 px-8 mb-20">
                    <p className="md:text-3xl text-xl font-bold pb-10 leading-7 text-center text-gray-700">Total Accounts: {apvAcc?.length}</p>
                    {
                        upvAcc &&
                        <div className="flex justify-end pb-7 px-5 w-full mx-auto">
                            <div className="indicator">
                                <span className="indicator-item badge badge-warning">{upvAcc?.length}</span>
                                <Link className='bg-info text-white rounded px-7 py-2' to="/cpanel/paccounts">Pending Account to Approve <FontAwesomeIcon icon={faPersonArrowUpFromLine} /> </Link>
                            </div>
                        </div>
                    }
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
                                apvAcc.map((account, index) =>
                                    <AccountsRow
                                        key={account._id}
                                        account={account}
                                        index={index}
                                        setDeposit={setDeposit}
                                        setWithdraw={setWithdraw}
                                        setDeleteAccount={setDeleteAccount}
                                    ></AccountsRow>)
                            }

                        </tbody>
                    </table>
                </div>

                {
                    deposit && <DepositModal deposit={deposit} ></DepositModal>
                }

                {
                    withdraw && <WidthdrawModal withdraw={withdraw} ></WidthdrawModal>
                }

                {
                    deleteAccount && <DeleteAccountModal deleteAccount={deleteAccount} refetch={refetch} ></DeleteAccountModal>
                }

            </div>
        </div>
    );
};

export default ManageAccounts;