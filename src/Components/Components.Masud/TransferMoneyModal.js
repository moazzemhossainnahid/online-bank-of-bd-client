import React, { useState } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from "react-hook-form";

import { toast } from 'react-toastify';
import axios from 'axios';
import useMainAccount from '../Components.Nahid/Hooks/useMainAccount';

const TransferMoneyModal = ({ transferMoney, setRefreshAccount, refreshAccount }) => {

    const { name, AccNo, balance, _id, accEmail, ahimage, ahcpimage, ahupimage, actype } = transferMoney;
    const { register, handleSubmit, reset } = useForm();
    const [transAcc, setTransAcc] = useState();
    const {mainAcc, refetch} = useMainAccount();
    const image = ahimage || ahcpimage || ahupimage;

    //console.log(transferMoney);


    const handleAccountBlur = (e) => {
        const tccAcc = e.target.value;
        axios.get(`https://online-bank-of-bd-server-production.up.railway.app/accountno?accountno=${tccAcc}`)
            .then(function (data) {
                setTransAcc(data?.data);
            })
    }

    const previousBalance = transAcc?.balance;
    const AccName = transAcc?.name;
    const AccNumber = transAcc?.AccNo;
    const AccEmail = transAcc?.accEmail;
    const trAcImg = transAcc?.ahimage || transAcc?.ahupimage || transAcc?.ahcpimage ;
    



    // Reciver info

    const handleTransferMoney = (data) => {

        const transName = data.name;
        const transAccNo = data.AccNo;
        const transBalance = data.balance;
        let today = new Date();

        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const timeAMPM = (date) => {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
          }
          
          const time = timeAMPM(today);

        // Receiver 
        const transferAmount = previousBalance + parseFloat(transBalance);
        const transferAccountNo = transAccNo;


        // Sender
        const depositBalance = balance - parseFloat(transBalance);
        const updateBalance = { depositBalance };

        
        let interest;

        if (actype && actype === 'Business Account') {
            const calc = transBalance * 7 / 100;
            interest = calc;
        } else if (actype && actype === 'Current Account') {
            const calc = transBalance * 5 / 100;
            interest = calc;
        } else if (actype && actype === 'Savings Account') {
            const calc = transBalance * 3 / 100;
            interest = calc;
        } else if (actype && actype === 'Sohoj Account') {
            const calc = transBalance * 2 / 100;
            interest = calc;
        } else {
            const calc = transBalance * 0 / 100;
            interest = calc;
        }

        // console.log(interest);



        if (AccName !== transName && AccNumber !== transAccNo) {
            return (
                toast.error("Account Name & Number Doesn't Match")
            )
        } else if (balance < 0 || balance < transBalance) {
            return (
                toast.error("You Dont Have Enough Balance for Transfer")
            )
        } else if (transBalance < 20) {
            return (
                toast.error("You Connot Transfer Less Than $20")
            )
        }

        // else if (transBalance > 100000) {
        //     return (
        //         toast.error("You got a confirmetion mail")
        //     )
        // }

        else {

            // Sender
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
                    reset();

                    setRefreshAccount(!refreshAccount)
                })

            // Receiver        
            const addBalance = { transferAmount };

            const senderUrl = `https://online-bank-of-bd-server-production.up.railway.app/accountno/${transferAccountNo}`;

            fetch(senderUrl, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(addBalance)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success("Transfer Money Successfully")
                    reset();

                    
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
                        toast.success(`${transBalance} Transfer Successful !`)
                        refetch();
                        // console.log("interest added");
                    })

                    
                })

            // Post Data for Statemant

            const senderStatementData = {
                senderAccount: AccNo,
                statement: "Transfer Money",
                deposit: transBalance ? parseFloat(transBalance) : 0,
                withdraw: 0,
                balance: depositBalance,
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
                body: JSON.stringify(senderStatementData)
            })
                .then(res => res.json())
                .then(data => {
                    toast("Statemant Created Successfully!");
                })

            // Receiver data

            const receiverStatementData = {
                senderAccount: parseFloat(transAccNo),
                statement: "Received Money",
                deposit: transBalance ? parseFloat(transBalance) : 0,
                withdraw: 0,
                balance: transferAmount,
                date: date,
                time: time,
                email: AccEmail,
                name: AccName,
                image: trAcImg
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
                    toast("Money Received")
                })
        }

    }

    return (
        <div className=''>
            <input type="checkbox" id="transfer-money-modal" className="modal-toggle" />
            <div className="modal modal-bottom md:modal-middle">
                <div className="modal-box w-full">
                    <label htmlFor="transfer-money-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h1 className="font-bold text-2xl pb-4 text-green-500">Transfer Money</h1>
                    <div className="flex flex-col w-full mx-auto justify-center lg:flex-row">
                        <div className="grid flex-grow h-full w-full  py-5 card bg-base-300 rounded-box place-items-center">
                            <h3 className="text-center font-semibold py-3 text-green-700">My Account</h3>
                            <div className="w-2/3 mx-auto text-left">
                                <div className="my-2">
                                    <h3 className="text-gray-700 text-sm">Account Holer Name</h3>
                                    <p className=""><FontAwesomeIcon className='pr-2' icon={faArrowRight} /><span className="text-rose-700">{name}</span></p>
                                </div>
                                <div className="my-2">
                                    <p className="text-gray-700">Account Number</p>
                                    <p className=""><FontAwesomeIcon className='pr-2' icon={faArrowRight} /><span className="text-rose-700"> {AccNo}</span></p>
                                </div>
                                <div className="my-2">
                                    <p className="text-gray-700">Available Balance</p>
                                    <p className=""><FontAwesomeIcon className='pr-2' icon={faArrowRight} /><span className="text-rose-700">$ {balance}</span></p>
                                </div>
                                <div className="py-9 w-full flex justify-center mx-auto">
                                    <FontAwesomeIcon className='text-3xl text-green-700' icon={faArrowRight} />
                                </div>
                            </div>

                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div className="grid flex-grow h-full w-full py-5 card bg-base-300 rounded-box place-items-center">
                            <h3 className="text-center font-semibold text-green-700 py-3">Transfer Account</h3>
                            <form onSubmit={handleSubmit(handleTransferMoney)} action="">
                                <div className="relative z-0 my-2">
                                    <input {...register("name")} type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-700 appearance-none dark:text-white dark:border-gray-600 dark:focus:green-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                                    <label htmlFor="floating_standard" className="absolute text-sm text-left w-full justify-start flex text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Account Holder Name</label>
                                </div>
                                <div onBlur={handleAccountBlur} className="relative z-0 my-2">
                                    {/* onBlur={accountNumber} */}

                                    <input {...register("AccNo")} type="number" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-700 appearance-none dark:text-white dark:border-gray-600 dark:focus:green-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                                    <label htmlFor="floating_standard" className="absolute text-sm text-left w-full justify-start flex text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Account Number</label>
                                </div>
                                <div className="relative z-0 my-2">
                                    <input {...register("balance")} type="number" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-700 appearance-none dark:text-white dark:border-gray-600 dark:focus:green-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                                    <label htmlFor="floating_standard" className="absolute text-sm text-left w-full justify-start flex text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Transfer Amount</label>
                                </div>
                                <div className="py-10 w-full flex justify-center mx-auto">
                                    <input className="inline-block px-7 py-2.5 border-2 border-green-700 text-green-700 font-medium text-xs leading-tight uppercase rounded hover:bg-gray-700 hover:text-white hover:border-rose-700 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                        data-mdb-ripple="true" data-mdb-ripple-color="light" type="submit" value="Transfer" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransferMoneyModal;