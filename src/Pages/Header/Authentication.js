import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useToken from '../../Components/Components.Nahid/Hooks/useToken';
import { signOut } from 'firebase/auth';

const Authentication = () => {
    const [user] = useAuthState(auth);
    const [token] = useToken();
    const navigate = useNavigate();
    const [profile ,setProfile]=useState(null)

    useEffect(()=>{
        fetch(`https://online-bank-of-bd-server-production.up.railway.app/profile/${user?.email}`)
        .then(res=>{
          if(!res.status===200){
            toast.error("Profile Not Found!")
          }
          return res.json()
        })
        .then(data=>{
          if(data){
            setProfile(data)
          }
        })
      },[user])

    const handleSignOut = async () => {
        await signOut(auth)
            .then(() => {
                localStorage.removeItem('accessToken');
                if (!token) {
                    navigate('/signin');
                    toast.success("User SignOut Successfully", { position: "top-left" });
                }
            })
    }
    return (
        <div>
            {
                // user ? <button onClick={handleSignOut} >SignOut</button> : <NavLink to="/signin">SignIn Your Account</NavLink>
                user ?
                    <div className="dropdown dropdown-end">
                        <div className="flex w-44 border border-x-primary mx-auto rounded px-5 py-1 items-center justify-between ">
                            <div className="">
                                <h3 className="text-primary text-xs">{user?.displayName?.slice(0, 10)}</h3>
                            </div>
                            <label tabindex="0" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    {
                                        profile?.image && <img src={profile?.image} alt='img' />
                                    }
                                    {!profile?.image &&
                                    user?.photoURL ? <img src={user?.photoURL} alt='' /> : <img src="https://placeimg.com/80/80/people" alt='' />}
                                </div>
                            </label>
                        </div>
                        <ul tabindex="0" className="mt-3 p-2 gap-1 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li> <Link to="/profile" className="justify-between"> Profile <span className="badge">New</span> </Link> </li>
                            <li><Link to="">Settings</Link></li>
                            <li><button onClick={handleSignOut}>Sign Out</button></li>
                        </ul>
                    </div>
                    : <button className='bg-primary text-white hover:bg-secondary px-5 py-2 rounded fony-semibold'><NavLink to="/signin">SignIn Your Account</NavLink></button>
            }

        </div>
    );
};

export default Authentication;