import React from 'react';
import { toast } from 'react-toastify';

const ApproveAccountModal = ({approveAccount, refetch}) => {

    const acc = approveAccount && approveAccount;

    const AccNo = acc?.AccNo;

console.log(approveAccount);

    const handleApprove = () =>{
        fetch(`https://online-bank-of-bd-server-production.up.railway.app/acc/${AccNo}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast('Approve Account Successfully')
                    refetch();
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="approve-account-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="approve-account-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='mb-4 badge badge-info badge-md font-semibold text-white px-5 py-3'>Review  <span className="text-rose-700 px-2">{acc?.name}</span>'s Account</h1>
                    <div className="flex w-full mx-auto items-center justify-center h-full">
                <div className="flex flex-col w-full rounded-lg bg-white shadow-lg">
                    <div className="w-4/5 p-5 md:w-3/5 mx-auto">
                        <img className=" object-cover rounded-full" src={(acc?.ahimage && acc?.ahimage) || (acc?.ahupimage && acc?.ahupimage) || (acc?.ahcpimage && acc?.ahcpimage)} alt="" />
                    </div>
                    <div className="p-6 w-full md:w-5/6 mx-auto flex flex-col justify-start">
                        <h5 className="text-gray-900 text-xl font-semibold mb-2">Name: <span className="text-green-700">{acc?.name}</span></h5>
                        <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Account Type: <span className=" text-xs md:text-base px-3 py-1 rounded-full bg-rose-700 text-white">{acc?.actype}</span></p>
                        <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Account Number: {acc?.AccNo}</p>
                        <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Balance: $ {acc?.balance}</p>
                        <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Email: {acc?.accEmail}</p>
                        <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">NID Number: {acc?.NIDno}</p>
                        <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Phone: {acc?.phone}</p>
                        <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Date of Birth: {acc?.DOB}</p>
                        <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Gender: {acc?.gender}</p>
                        <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Branch: {acc?.branch}</p>
                        <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Religion: {acc?.religion}</p>
                        <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Country: {acc?.country}</p>
                        <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Address: {acc?.address}</p>
                        <p className="text-gray-600 text-xs">Account Created {acc?.OpeningDate}</p>
                        <div className="flex justify-around items-center gap-2 p-5 w-full mx-auto">
                        <img className=" object-cover rounded w-3/6 mx-auto" src={acc?.NIDFrontSide && acc?.NIDFrontSide} alt="" />
                        <img className=" object-cover rounded w-3/6 mx-auto" src={acc?.NIDBackSide && acc?.NIDBackSide} alt="" />
                        </div>
                    </div>
                </div>

            </div>                                    
                    <div className="modal-action">
                        <label htmlFor="approve-account-modal" onClick={handleApprove} className="btn">Approve</label>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ApproveAccountModal;