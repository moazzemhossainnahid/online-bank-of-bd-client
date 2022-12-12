import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import useMainAccount from '../Components.Nahid/Hooks/useMainAccount';

const WidthdrawModal = ({ withdraw, setRefresh, refresh }) => {
    const { name, AccNo, balance, _id, accEmail, ahimage, ahcpimage, ahupimage, actype } = withdraw;
    const { mainAcc, refetch } = useMainAccount();
    const [count, setCount] = useState();

    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const timeAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const time = timeAMPM(today);
    const inputBalRef = useRef('');


    const hadleWithdraw = () => {
        const inputBalance = parseFloat(inputBalRef.current.value);
        const depositBalance = parseFloat(balance - inputBalance);
        const updateBalance = { depositBalance };
        const image = ahimage || ahcpimage || ahupimage;

        let interest;

        if (actype && actype === 'Business Account') {
            const calc = inputBalance * 5 / 100;
            interest = calc;
        } else if (actype && actype === 'Current Account') {
            const calc = inputBalance * 3 / 100;
            interest = calc;
        } else if (actype && actype === 'Savings Account') {
            const calc = inputBalance * 2 / 100;
            interest = calc;
        } else if (actype && actype === 'Sohoj Account') {
            const calc = inputBalance * 1 / 100;
            interest = calc;
        } else {
            const calc = inputBalance * 0 / 100;
            interest = calc;
        };

        if (inputBalRef.current.value === '' ) {
            return toast.error("Please Input a Valid Amount");
        } else if (balance < 0 || balance < inputBalance) {
            return (
                toast.error("You Dont Have Enough Balance for Withdraw")
            )
        } else if (inputBalance < 5) {
            return (
                toast.error("You Connot Withdraw Less Than $5")
            )
        } else {
            const url = `https://online-bank-of-bd-server-production.up.railway.app/account/${_id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updateBalance)
            })

                .then(res => res.json())
                .then(data => {
                    // toast.success(`${inputBalance} withdrawal successful`)
                    inputBalRef.current.value = '';




                    const mainAcBal = mainAcc?.balance;
                    const newMainBal = mainAcBal + interest;
                    // console.log(newMainBal);
                    // console.log(parseFloat(newMainBal));

                    const updateBal = { bal: newMainBal };

                    // console.log(mainAcc?.balance);
                    // console.log(interest);
                    const mainurl = `https://online-bank-of-bd-server-production.up.railway.app/mainaccount/${mainAcc?._id}`;
                    fetch(mainurl, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updateBal)
                    })

                        .then(res => res.json())
                        .then(data => {
                            // toast.success(`${interest} Interest Add Successfull`);
                            toast.success(`${inputBalance} Withdrawal Successful !`)
                            refetch();
                            // console.log("interest added");
                        })


                })

        }


        // withdraw Statement Creator

        const receiverStatementData = {
            senderAccount: AccNo,
            statement: "Withdraw Money",
            deposit: 0,
            withdraw: inputBalance,
            balance: parseFloat(updateBalance?.depositBalance),
            date: date,
            time: time,
            email: accEmail,
            name: name,
            image: image
        }

        fetch('https://online-bank-of-bd-server-production.up.railway.app/statement', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(receiverStatementData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
            })
    }

    // console.log(mainAcc?.balance);

    return (
        <div>

            <input type="checkbox" id="withdraw-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle text-center">
                <div className="modal-box">
                    <label htmlFor="withdraw-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h1 className='mb-4 badge badge-info text-2xl badge-lg p-4'>Withdraw Money</h1>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <p className='my-4'>Ac. No: {AccNo}</p>
                    <p className='my-4'>Balance: {balance}</p>

                    <input ref={inputBalRef} min={10000} type="number" placeholder="$ amount" className="input input-bordered input-primary w-full max-w-xs" />
                    <div className="modal-action">
                        <label htmlFor="withdraw-modal" onClick={hadleWithdraw} className="btn">Withdraw</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WidthdrawModal;