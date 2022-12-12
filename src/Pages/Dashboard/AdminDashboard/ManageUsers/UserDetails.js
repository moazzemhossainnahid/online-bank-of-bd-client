import React from 'react';
import { toast } from 'react-toastify';

const UserDetails = ({ user, index }) => {
    const { _id, email, role } = user;

    const handleMakeAdmin = () => {
        fetch(`https://online-bank-of-bd-server-production.up.railway.app/user/admin/${email}`, {
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
                    toast('Successfully Make an Admin')
                }
            })
    }

    const handleRemoveAdmin = () => {
        fetch(`https://online-bank-of-bd-server-production.up.railway.app/user/admin/remove/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast('Successfully Remove an Admin')
                }
            })
    }

    const handleRemoveUser = (id) => {
        fetch(`https://online-bank-of-bd-server-production.up.railway.app/user/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast('Successfully Remove an User')
                }
            })
    }

    return (

        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block font-semibold lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Index</span>
                {index + 1}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Email</span>
                {email}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
                {role === 'admin' ? <div className="badge text-blue-700 badge-outline">Admin</div> : <button onClick={handleMakeAdmin} className="btn btn-xs btn-outline btn-primary">Make Admin</button>}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                {role !== 'admin' ? <button onClick={() => handleRemoveUser(_id)} className="btn btn-xs btn-outline btn-natural">Remove User</button> : <button onClick={handleRemoveAdmin} className="btn btn-xs btn-outline btn-secondary">Remove Admin</button>}
            </td>
        </tr>

    );
};

export default UserDetails;