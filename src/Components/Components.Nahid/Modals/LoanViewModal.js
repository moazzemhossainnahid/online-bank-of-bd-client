import React from 'react';

const LoanViewModal = ({ viewLoan }) => {

    /* const loan = viewLoan && viewLoan[0];
    console.log(viewLoan)
 */
    const { address, interestTotal, loanFromAcc, userName, loanPeriodYear, loanType, needToPayForEveryTransaction, phone, status, totalAmountTotal, userEmail } = viewLoan;


    // console.log(loan?.userEmail);

    // const handleDelete = () =>{
    //     fetch(`https://online-bank-of-bd-server-production.up.railway.app/acc/${AccNo}`, {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json',
    //             authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //         .then(res => {
    //             return res.json()
    //         })
    //         .then(data => {
    //             if (data.modifiedCount > 0) {
    //                 toast('Approve Account Successfully')
    //                 // refetch();
    //             }
    //         })
    // }


    return (
        <div>
            <input type="checkbox" id="loan-view-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="loan-view-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='mb-4 badge badge-info badge-md font-semibold text-white px-5 py-3'>Review <span className="text-rose-700 px-2">{userName}</span>'s Loan</h1>
                    <div className="flex w-full mx-auto items-center justify-center h-full">
                        <div className="flex flex-col w-full rounded-lg bg-white shadow-lg">
                            <div className="p-6 w-full md:w-5/6 mx-auto flex flex-col justify-start">
                                <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Account Number: {loanFromAcc}</p>
                                <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Interest Total: $ {interestTotal}</p>
                                <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Email: {userEmail}</p>
                                <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Phone: {phone}</p>
                                <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Loan Total Amount: {totalAmountTotal}</p>
                                <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Status: <span className="badge badge-secondary badge-sm text-white">{status}</span></p>
                                <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Address: {address}</p>
                                <p className="text-gray-600 text-xs md:text-base font-semibold mb-4"> Loan Type: {loanType} Month's</p>
                            </div>

                        </div>
                        {/* <div className="modal-action">
                        <label htmlFor="loan-view-modal" onClick={handleDelete} className="btn">Delete</label>
                    </div> */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanViewModal;