import React, { useEffect, useState } from 'react';
import AccountsRow from './AccountsRow';
import DeleteAccountModal from './DeleteAccountModal';
import DepositModal from './DepositModal';
import WidthdrawModal from './WidthdrawModal';

const AllUsersAccounts = () => {

    const [accounts, setAccounts] = useState([]);
    const [deposit, setDeposit] = useState(null);    
    const [withdraw, setWithdraw] = useState(null);
    const [deleteAccount, setDeleteAccount] = useState(null);   
    
    useEffect(()=> {        
         fetch('https://online-bank-of-bd-server-production.up.railway.app/allaccounts')
        .then(res => res.json())
        .then( data =>  setAccounts(data))
    }, [])




    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Acc. No</th>
                            <th>Balance</th> 
                            <th>Phone</th> 
                            <th>Action</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}

                        {
                            accounts.map(account => 
                            <AccountsRow
                                key={account._id}
                                account={account}
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
            deleteAccount && <DeleteAccountModal deleteAccount={deleteAccount} ></DeleteAccountModal>
        }

        </div>
    );
};

export default AllUsersAccounts;