import { faArrowAltCircleRight, faBank, faMoneyCheckAlt, faReceipt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DBCards = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [todayTrnsaction, setTodayTransaction] = useState(0)

    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    useEffect(() => {
        fetch('https://online-bank-of-bd-server-production.up.railway.app/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);


    useEffect(() => {
        fetch('https://online-bank-of-bd-server-production.up.railway.app/allaccounts')
            .then(res => res.json())
            .then(data => setAccounts(data))
    }, [])


    const TotalBalance = accounts?.map(a => a.balance)
        .reduce((a, b) => {
            return a + b;
        }, 0);

    useEffect(() => {
        fetch('https://online-bank-of-bd-server-production.up.railway.app/statements')
            .then(res => res.json())
            .then(data => setTransactions(data))
    }, [])

    useEffect(() => {
        const todayDeposit = transactions
            .filter((transaction) => transaction.date === date)
            .map((account) => account.deposit)
            .reduce((a, b) => (a + b), 0);

        const todayWidthdraw = transactions
            .filter((transaction) => transaction.date === date)
            .map((account) => account.withdraw)
            .reduce((a, b) => (a + b), 0);

        const todayTransaction = todayDeposit + todayWidthdraw;
        setTodayTransaction(todayTransaction)
    }, [transactions, date])



    return (
        <div className=''>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 py-10">
                {/* Registered Users */}
                <div className="">
                    <div className="flex items-center justify-between bg-yellow-300 p-3 rounded-t-xl">
                        <div className="">
                            <h3 className="text-3xl md:text-4xl font-bold py-2 text-white">{users?.length}</h3>
                            <h3 className="text-md font-bold text-white">Registered Users</h3>
                        </div>
                        <div className="">
                            <FontAwesomeIcon className='text-[#42424281] text-3xl md:text-4xl' icon={faUserPlus} />
                        </div>
                    </div>
                    <div onClick={() => navigate('/cpanel/musers')} className="bg-yellow-400 cursor-pointer py-2 text-center rounded-b-xl">
                        <h2 className="text-md text-white">More Info <FontAwesomeIcon className='pl-2' icon={faArrowAltCircleRight} /> </h2>
                    </div>
                </div>
                {/* Bank Accounts */}
                <div className="">
                    <div className="flex items-center justify-between bg-[#17A2BB] p-3 rounded-t-xl">
                        <div className="">
                            <h3 className="text-3xl md:text-4xl font-bold py-2 text-white">{accounts?.length}</h3>
                            <h3 className="text-md font-bold text-white">Customers Accounts</h3>
                        </div>
                        <div className="">
                            <FontAwesomeIcon className='text-[#42424281] text-3xl md:text-4xl' icon={faBank} />
                        </div>
                    </div>
                    <div onClick={() => navigate('/cpanel/maccounts')} className="bg-[#0c93ab] cursor-pointer py-2 text-center rounded-b-xl">
                        <h2 className="text-md text-white">More Info <FontAwesomeIcon className='pl-2' icon={faArrowAltCircleRight} /> </h2>
                    </div>
                </div>
                {/* OBB Balance */}
                <div className="">
                    <div className="flex items-center justify-between bg-[#28A745] p-3 rounded-t-xl">
                        <div className="">
                            <h3 className="text-3xl md:text-4xl font-bold py-2 text-white">$ {TotalBalance?.toFixed(0)}</h3>
                            <h3 className="text-md font-bold text-white">Our Balance</h3>
                        </div>
                        <div className="">
                            <FontAwesomeIcon className='text-[#42424281] text-3xl md:text-4xl' icon={faMoneyCheckAlt} />
                        </div>
                    </div>
                    <div onClick={() => navigate('/cpanel/maccounts')} className="bg-[#0f9c30] cursor-pointer py-2 text-center rounded-b-xl">
                        <h2 className="text-md text-white">More Info <FontAwesomeIcon className='pl-2' icon={faArrowAltCircleRight} /> </h2>
                    </div>
                </div>
                {/* Todays Transactions */}
                <div className="">
                    <div className="flex items-center justify-between bg-[#DC3545] p-3 rounded-t-xl">
                        <div className="">
                            <h3 className="text-3xl md:text-4xl font-bold py-2 text-white">$ {todayTrnsaction}</h3>
                            <h3 className="text-md font-bold text-white">Todays Transactions</h3>
                        </div>
                        <div className="">
                            <FontAwesomeIcon className='text-[#42424281] text-3xl md:text-4xl' icon={faReceipt} />
                        </div>
                    </div>
                    <div onClick={() => navigate('/cpanel/thistory')} className="bg-[#bd1122] cursor-pointer py-2 text-center rounded-b-xl">
                        <h2 className="text-md text-white">More Info <FontAwesomeIcon className='pl-2' icon={faArrowAltCircleRight} /> </h2>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DBCards;