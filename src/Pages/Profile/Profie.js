import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import UseAdmin from '../../Components/Components.Nahid/Hooks/useAdmin';
import auth from '../../firebase.init';
import useProfile from './useProfile';
const Profile = () => {
    const [user] = useAuthState(auth);
    const [profile] = useProfile(user?.email);
    const { register, handleSubmit, reset } = useForm();
    const [admin] = UseAdmin();


    const imageUrlKey = 'e738f1d16de6b265746b7f82cc157644';
    // handle Update Profile

    const handleUpdateProfile = async (data) => {
        const email = data.email;
        const image = data.photoURL[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageUrlKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const profile = {
                        displayName: data.displayName,
                        email: data.email,
                        phone: data.phone,
                        photoURL: img
                    }

                    // send to database
                    fetch(`https://online-bank-of-bd-server-production.up.railway.app/profile/${email}`, {
                        method: 'PUT',
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`

                        },
                        body: JSON.stringify(profile)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            // console.log(inserted);
                            if (inserted) {
                                toast.success("Updated Successfully")
                                reset();
                            } else {
                                toast.error("Faild to Update")
                            }
                        })

                }
            })
        // await updateProfile({displayName : displayName, photoURL})

    }


    
    return (
        <section className='bg-gradient-to-l from-secondary to-accent h-full w-full'>
        
        <div className='w-5/6 mx-auto pb-20'>

            <div className="h-full text-left">

                <div className="border-b-2 py-20 flex flex-col md:flex-row">

                    <div className="w-full md:w-2/5 p-4 mt-20 md:mt-0 sm:p-6 lg:p-8 bg-white shadow-md">
                        <div className="">
                            <span className="text-xl font-semibold block">{user ? `${user?.displayName}'s Profile` : 'User Profile'} </span>
                            {/* <label for="my-modal-3" className="btn modal-button">open modal</label> */}
                        </div>

                        <span className="text-gray-600">This information is secret so be careful</span>
                        <span className="text-white badge badge-primary font-semibold font-sans px-5 py-2 rounded">{admin ? 'Admin Account' : 'User Account'}</span>
                        <div className="w-full h-fit p-8 mx-2 flex justify-center">
                            <img id="showImage" className="max-w-xs w-32 items-center border-2 rounded shadow " src={user?.photoURL ? user?.photoURL : 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png' || profile?.photoURL ? profile?.photoURL : 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png'} alt="" />
                        </div>
                        <div className="flex justify-end py-3"><label for="my-modal-3" className="mt-2 text-md font-bold text-right  text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">Edit</label></div>

                    </div>

                    <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                        <div className="rounded  shadow p-6">
                            <div className="pb-6">
                                <label for="name" className="font-semibold text-gray-700 block pb-1">Name</label>
                                <div className="flex">
                                    <input disabled id="username" className="border-1  rounded-r px-4 py-2 w-full" type="text" value={user?.displayName ? user?.displayName : profile.displayName} />
                                </div>
                            </div>
                            <div className="pb-4">
                                <label for="about" className="font-semibold text-gray-700 block pb-1">Email</label>
                                <input disabled id="email" className="border-1  rounded-r px-4 py-2 w-full" type="email" value={ user ? `${user?.email}` : `${user?.email}`} />
                            </div>
                            <div className="pb-4">
                                <label for="about" className="font-semibold text-gray-700 block pb-1">Phone</label>
                                <input disabled id="phone" className="border-1  rounded-r px-4 py-2 w-full" type="tel" value={ profile?.phone ? `${profile?.phone}` : '+880-123-456-789'} />
                                <span className="text-gray-600 pt-4 block opacity-70">Personal login information of your account</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


            <div>
            {/* <!-- The button to open modal --> */}
            

            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box relative  bg-success">
                <label for="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="text-lg font-bold">Please Update Your Profile Indormation</h3>
                <form onSubmit={handleSubmit(handleUpdateProfile)} action="" className='py-3'>
                <input {...register('displayName')} type="text" placeholder="Enter Your Name" className="input bg-slate-100 my-2 input-ghost w-full block mx-auto max-w-xs" />
                <input {...register('email')} type="email" placeholder="Enter Your Email" value={ user ? `${user?.email}` : `${user?.email}`} className="input bg-slate-100 my-2 input-ghost w-full block mx-auto max-w-xs" />
                <input {...register('phone')} type="tel" placeholder="Enter Your Phone" className="input bg-slate-100 my-2 input-ghost w-full block mx-auto max-w-xs" />
                <input {...register('photoURL')} type="file" placeholder="Enter Your Password" className="input bg-slate-100 my-2 input-ghost items-center w-full block mx-auto max-w-xs cursor-pointer border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-lg" />
                <input className='btn px-7 btn-secondary my-5 block mx-auto' type="submit" value="Save" />
                </form> 
            </div>
            </div>
        </div>

        </div>
        </section>
    );
};

export default Profile;