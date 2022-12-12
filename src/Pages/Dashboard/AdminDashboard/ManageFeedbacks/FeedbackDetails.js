import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Swal from 'sweetalert2';

const FeedbackDetails = ({ feedback, index, refetch }) => {
    const { _id, name, img, feedbackComment, date } = feedback;

    const editFeedback = (id) => {
        Swal.fire({
            title: 'Are you sure to Update?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://online-bank-of-bd-server-production.up.railway.app/feedback/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            Swal.fire(
                                'Updated!',
                                'Your file has been updated.',
                                'success'
                            )
                        }

                    })
            }
        })



    }

    const removeFeedback = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://online-bank-of-bd-server-production.up.railway.app/feedback/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                                )
                                refetch();
                        }

                    })
            }
        })


    }

    return (
        <div key={index} className="w-full h-64 flex flex-col mx-auto justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
            <div>
                <h3 className="text-gray-800 text-sm dark:text-gray-100 leading-7 font-semibold w-11/12">{feedbackComment}</h3>
            </div>
            <h3 className="text-md font-semibold text-rose-700">{name}</h3>
            <div>
                <div className="mb-3 flex items-center flex-no-wrap">
                    <div className="w-10 h-10 bg-cover bg-center rounded-md">
                        <img src={img} alt="read by Alia" className="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white dark:border-gray-700 shadow" />
                    </div>
                </div>
                <div className="flex items-center justify-between text-gray-800">
                    <p className="dark:text-gray-100 text-sm">{date}</p>
                    <div className="flex items-center justify-center gap-3">
                        <div onClick={() => editFeedback(_id)} className="cursor-pointer">
                            <FontAwesomeIcon className='text-xl hover:text-green-700 hover:scale-125 ease-in-out duration-200' icon={faEdit} />
                        </div>
                        <div onClick={() => removeFeedback(_id)} className="cursor-pointer">
                            <FontAwesomeIcon className='text-xl hover:text-red-700 hover:scale-125 ease-in-out duration-200' icon={faTrashAlt} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackDetails;