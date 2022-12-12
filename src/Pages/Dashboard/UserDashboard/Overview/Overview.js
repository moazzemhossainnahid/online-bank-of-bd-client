import React, { useEffect, useState } from 'react';
import useAccount from '../../../../Components/Components.Nahid/Hooks/useAccount';
import Loading from '../../../../Components/Components.Nahid/Loading';
import PageTitle from '../../../PageTitle/PageTitle';
import ACOverview from './ACOverview';
import OVCards from './OVCards';
import TopOverview from './TopOverview';
import TotalBalance from './TotalBalance';
import TransacOverview from './TransacOverview';

const Overview = () => {
    const { myAccount, isLoading } = useAccount();
    const [currentAccount, setCurrentAccount] = useState();
    const frstacc = myAccount && myAccount[0]?.AccNo;
    const [selectAcc = frstacc, setSelectAcc] = useState();
    const [transactions, setTransactions] = useState([]);
    const myTrc = transactions && transactions[0]?.senderAccount;
    const [myTransactions = myTrc, setMyTransactions] = useState([]);
    const [todayTrnsaction, setTodayTransaction] = useState(0)
    const [tdDeposit, setTdDeposit] = useState(0)
    const [tdWithdraw, setTdWithdraw] = useState(0)

    const trAcc = currentAccount && currentAccount[0];
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    useEffect(() => {
        const account = myAccount?.filter(ac => ac.AccNo === parseInt(selectAcc));
        setCurrentAccount(account);
    }, [myAccount, selectAcc]);



    useEffect(() => {
        fetch('https://online-bank-of-bd-server-production.up.railway.app/statements')
            .then(res => res.json())
            .then(data => setTransactions(data))
    }, [])

    useEffect(() => {
        const todayDeposit = transactions
            .filter((transaction) => transaction?.date === date && transaction?.senderAccount === trAcc?.AccNo)
            .map((account) => account.deposit)
            .reduce((a, b) => (a + b), 0);

        const todayWidthdraw = transactions
            .filter((transaction) => transaction?.date === date && transaction?.senderAccount === trAcc?.AccNo)
            .map((account) => account.withdraw)
            .reduce((a, b) => (a + b), 0);

        const todayTransaction = todayDeposit + todayWidthdraw;
        setTdDeposit(todayDeposit);
        setTdWithdraw(todayWidthdraw);
        setTodayTransaction(todayTransaction);

    }, [transactions, date, trAcc])

    useEffect(() => {
        const trc = transactions.filter((transaction) => transaction?.senderAccount === trAcc?.AccNo);
        setMyTransactions(trc);
    }, [transactions, trAcc]);



    // console.log(frstacc);

    if (isLoading) {
        return <Loading />
    }

    const handleSelect = (e) => {
        const acc = e.target.value;
        setSelectAcc(acc);
    }







    return (
        <section className="w-full p-5">
            {/* title */}

            <PageTitle title="Overview"></PageTitle>

            {/* end */}



            <TopOverview handleSelect={handleSelect} frstacc={frstacc} setSelectAcc={setSelectAcc} />
            {
                currentAccount && <div className='flex flex-col lg:flex-row justify-center items-center gap-5 w-full mx-auto'>
                    <div className="w-full lg:w-2/5 mx-auto">
                        <TotalBalance currentAccount={currentAccount} todayTrnsaction={todayTrnsaction} />
                        <OVCards currentAccount={currentAccount} />
                    </div>
                    <div className="w-full flex flex-col gap-3 lg:w-3/5 mx-auto">
                        <ACOverview currentAccount={currentAccount} todayTrnsaction={todayTrnsaction} tdDeposit={tdDeposit} tdWithdraw={tdWithdraw} />
                        <TransacOverview currentAccount={currentAccount} myTransactions={myTransactions} />
                    </div>
                </div>
            }
        </section>
    );
};

export default Overview;