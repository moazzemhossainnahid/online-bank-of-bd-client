import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Components.Nahid/Loading';
import { useStepperContext } from '../../../Components/Components.Nahid/StepperContext';
import auth from '../../../firebase.init';

const ApplicationPreview = ({ currentStep, steps }) => {
    const [submit, setSubmit] = useState(false);
    const { CAData } = useStepperContext();
    const [user, loading] = useAuthState(auth);
    const accno = Math.floor(Math.random() * 1000000000000);
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    if (loading) {
        return <Loading />
    }

    const handleCreateAccount = () => {
        const name = CAData?.name;
        const phone = parseFloat(CAData?.phone);
        const accEmail = CAData?.email;
        const NIDno = parseFloat(CAData?.NIDno);
        const NIDFrontSide = CAData?.NIDFront;
        const NIDBackSide = CAData?.NIDBack;
        const DOB = CAData?.DOB;
        const ahimage = CAData?.ahimage;
        const ahupimage = CAData?.ahupimage;
        const ahcpimage = CAData?.ahcpimage;
        const AccNo = accno;
        const balance = parseFloat(CAData?.balance);
        const acpurpose = CAData?.acpurpose;
        const actype = CAData?.actype;
        const branch = CAData?.branch;
        const email = user?.email;
        const religion = CAData?.religion;
        const gender = CAData?.gender;
        const country = CAData?.country;
        const address = CAData?.address;

        const accountDetails = {
            name: name,
            phone: phone,
            email: email,
            NIDno: NIDno,
            NIDFrontSide: NIDFrontSide,
            NIDBackSide: NIDBackSide,
            DOB: DOB,
            ahimage: ahimage,
            ahupimage: ahupimage,
            ahcpimage: ahcpimage,
            AccNo: AccNo,
            balance: balance,
            acpurpose: acpurpose,
            actype: actype,
            branch: branch,
            accEmail: accEmail,
            religion: religion,
            gender: gender,
            country: country,
            address: address,
            OpeningDate: date,
        }

        Swal.fire({
            title: 'Are you sure to Submit Data?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Submit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('https://online-bank-of-bd-server-production.up.railway.app/account', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(accountDetails)
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.insertedId && data.acknowledged === true){
                            Swal.fire(
                                'Submitted!',
                                'Your Data has been Under Review.',
                                'success'
                            )
                            setSubmit(true)
                        }
                    })
            }
        })

    };

    // {(currentStep === steps.length - 1) && handleCreateAccount()}



    return (
        <div className="flex flex-col w-full mx-auto items-center justify-center h-full">
            <div className="flex flex-col md:flex-row w-full rounded-lg bg-white shadow-lg">
                <div className="w-full flex flex-col p-5 md:w-2/5 mx-auto">
                    <div className="">
                    <img className=" object-cover rounded-t-lg md:rounded-none md:rounded-l-lg" src={CAData?.ahimage || CAData?.ahupimage || CAData?.ahcpimage} alt="" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto items-center justify-center gap-3 py-5 px-3">
                    <img className=" object-cover h-20 w-24 rounded" src={CAData?.ahimage ? CAData?.ahimage : 'https://icon-library.com/images/icon-url/icon-url-14.jpg' } alt="" />
                    <img className=" object-cover h-20 w-24 rounded" src={CAData?.ahupimage ? CAData?.ahupimage : 'https://static.thenounproject.com/png/26448-200.png' } alt="" />
                    <img className=" object-cover h-20 w-24 rounded" src={CAData?.ahcpimage ? CAData?.ahcpimage : 'https://i.ibb.co/mNqpbdt/photo-camera-PNG101598.png' } alt="" />
                    </div>
                </div>
                <div className="p-6 w-full md:w-3/5 mx-auto flex flex-col justify-start">
                    <h5 className="text-gray-900 text-xl font-semibold mb-2">Name: <span className="text-green-700">{CAData?.name}</span></h5>
                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Account Type: <span className=" text-xs md:text-base px-3 py-1 rounded-full bg-rose-700 text-white">{CAData?.actype}</span></p>
                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Account Number: {accno}</p>
                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Balance: $ {CAData?.balance}</p>
                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Email: {CAData?.email}</p>
                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">NID Number: {CAData?.NIDno}</p>
                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Phone: {CAData?.phone}</p>
                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Date of Birth: {CAData?.DOB}</p>
                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Gender: {CAData?.gender}</p>
                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Country: {CAData?.country}</p>
                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Address: {CAData?.address}</p>
                </div>
            </div>
            <button onClick={handleCreateAccount} disabled={submit} className={`${submit === true ? " cursor-not-allowed opacity-50 " : ""} cursor-pointer my-5 rounded-xl border-2 border-slate-300 bg-blue-500 text-white py-2 px-4 font-semibold uppercase transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white`}>
                Submit Your Data
            </button>
        </div>
    );
};

export default ApplicationPreview;