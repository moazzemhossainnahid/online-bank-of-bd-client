import {
  faCheckDouble,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./MyAccount.css";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import Loading from "../../Components.Nahid/Loading";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import UseAdmin from "../../Components.Nahid/Hooks/useAdmin";
import Avatar from '../../../Assets/Images/blog/undraw_profile_pic_ic5t.png'
const Profile = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [btnSpinner, setBtnSpinner] = useState(false)
  const [admin, adminLoading] = UseAdmin()
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(true)
  const imageUrlKey = 'e738f1d16de6b265746b7f82cc157644';
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const email = user?.email
  useEffect(() => {
    fetch(`https://online-bank-of-bd-server-production.up.railway.app/profile/${email}`)
      .then(res => {
        if (!res.status === 200) {
          toast.error("Profile Not Found!")
        }
        return res.json()
      })
      .then(data => {
        if (data) {
          setProfile(data)
          setProfileLoading(false)
        }
      })
  }, [email, btnSpinner, avatarLoading])

  if (loading || adminLoading || profileLoading) {
    <Loading />
  }

  // handle logout function 
  const handleLogout = () => {
    signOut(auth)
    localStorage.removeItem("accessToken")
    navigate("/signin")
  }
  // handle Update Profile
  const handleUploadAvatar = (e) => {
    setAvatarLoading(true)
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageUrlKey}`;
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => {
        if (!res.status === 200) {
          toast.error("Your Image Size Larger!")
          setAvatarLoading(false)
        }
        return res.json()
      })
      .then(result => {
        if (result.data?.url) {
          const url = result?.data?.url;
          fetch(`https://online-bank-of-bd-server-production.up.railway.app/profile/image/${email}`, {
            method: "put",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ url })
          }).then(res => {
            if (!res.status === 200) {
              toast.error("Image Upload Failed!")
              setAvatarLoading(false)
            }
            return res.json();
          }).then(result => {
            if (result) {
              setAvatarLoading(false)
              toast.success("successfully Update Your Avatar")
            }
          })

        }
      })
  }
  // handle onsubmit function 
  const onSubmit = async (data) => {
    setBtnSpinner(true);
    const displayName = data.firstName + " " + data.lastName;
    const profile = {
      displayName: displayName,
      email: data.email,
      phone: data.phone,
      birthday: data.birthday,
      gender: data.gender,
      address: data.address,
      joined: date
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
      .then(res => {
        if (!res.status === 200) {
          toast.error("update Failed  server error")
          setBtnSpinner(false)
        }
        return res.json()
      })
      .then(inserted => {
        if (inserted) {
          toast.success("Updated Successfully")
          reset();
          setBtnSpinner(false)
        } else {
          toast.error("Faild to Update")
          setBtnSpinner(false)
        }
      })
  }
  return (
    <div className="myAccount">
      <div className="header-bg"></div>
      <div className="myProfile lg:w-11/12 lg:mx-16 md:mx-6 mx-1 lg:flex gap-10 -mt-72 mb-20">
        <div className="profile lg:mt-28 mt-32">
          <div className="card lg:w-96 w-full bg-base-100 shadow-xl mx-auto">
            <figure className="px-10 pt-10">
              <img
                src={profile?.image ? profile?.image : Avatar}
                alt="Shoes"
                className="rounded-full w-36 h-36 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="font-bold text-2xl text-center">{profile?.displayName ? `${profile?.displayName}` : user?.displayName}</h2>
              <p className="text-green-500 text-center">{admin ? "Admin" : "User"}</p>
              <div className="hr text-black py-2">
                <hr />
              </div>
              {
                !profile ? <p className="text-xl text-center">Please Update Your Profile</p> :

                  <div className="account-details">
                    <p className="account-id">
                      <div className="text-left">User ID:</div>
                      <div className="text-right -mt-5 text-slate-400">
                        {profile?._id}
                      </div>
                    </p>
                    {
                      profile?.joined &&
                      <p className="accountOpening-date my-6">
                        <div className="text-left">Joined:</div>
                        <div className="text-right -mt-5 text-slate-400">
                          {profile?.joined}
                        </div>
                      </p>
                    }
                    <p className="accountOpening-date my-6">
                      <div className="text-left">Email:</div>
                      <div className="text-right -mt-5 text-slate-400">
                        {profile?.email}
                      </div>
                    </p>
                    {
                      profile?.gender &&
                      <p className="accountOpening-date my-6">
                        <div className="text-left">Gender:</div>
                        <div className="text-right -mt-5 text-slate-400">
                          {profile?.gender}
                        </div>
                      </p>
                    }
                    {
                      profile?.birthday &&
                      <p className="accountOpening-date my-6">
                        <div className="text-left">Date of Birth:</div>
                        <div className="text-right -mt-5 text-slate-400">
                          {profile?.birthday}
                        </div>
                      </p>
                    }
                    {
                      profile?.phone &&
                      <p className="accountOpening-date my-6">
                        <div className="text-left">Phone:</div>
                        <div className="text-right -mt-5 text-slate-400">
                          {profile?.phone}
                        </div>
                      </p>
                    }
                    <p className="accountOpening-date my-6">
                      <div className="text-left">Confirm Status:</div>
                      <div className="text-right -mt-5 text-slate-400">80%</div>
                    </p>
                    <div className="logout-btn text-center">
                      <button
                        onClick={handleLogout}
                        className="btn border-slate-200 normal-case text-slate-600 bg-slate-100 btn-ghost w-full rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>

                        SignOut
                      </button>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>
        <div className="profile-customize w-full lg:mt-28 mt-10">
          <div className="h-fit bg-base-100 shadow-xl rounded-2xl">
            <div className="card-body tab-content" id="tabs-tabContentFill">
              <div className="profileCustomizeHead lg:gap-3  gap-0 justify-between">
                <ul
                  className="nav nav-tabs flex  md:flex-row w-full  list-none border-b-0 pl-0 mb-4"
                  id="tabs-tabFill"
                  role="tablist"
                >
                  <li
                    className="nav-item flex-auto text-center p-0 m-0"
                    role="presentation"
                  >
                    <a
                      href="#tabs-accountFill"
                      className="
                            nav-link
                            block
                            w-22
                            lg:w-full
                            font-medium
                            text-xs
                            leading-tight
                            uppercase
                            p-0 mx-1
                            active
                          "
                      id="tabs-account-tabFill"
                      data-bs-toggle="pill"
                      data-bs-target="#tabs-accountFill"
                      role="tab"
                      aria-controls="tabs-accountFill"
                      aria-selected="true"
                    >
                      <div className="account p-0 m-0">
                        <button className="btn btn-xs md:btn-xl  normal-case my-4 lg:my-0 border-slate-200 hover:text-indigo-700 bg-slate-100 md:px-10 px-2 btn-ghost  rounded-2xl">
                          Account
                        </button>
                      </div>
                    </a>
                  </li>
                  <li
                    className="nav-item flex-auto text-center p-0 m-0"
                    role="presentation"
                  >
                    <a
                      href="#tabs-securityFill"
                      className="
                            nav-link
                            block
                            w-22
                            lg:w-full
                            font-medium
                            text-xs
                            leading-tight
                            uppercase
                           p-0 mx-1
                          "
                      id="tabs-security-tabFill"
                      data-bs-toggle="pill"
                      data-bs-target="#tabs-securityFill"
                      role="tab"
                      aria-controls="tabs-securityFill"
                      aria-selected="false"
                    >
                      <div className="security">
                        <button className="btn btn-xs md:btn-xl normal-case my-4 lg:my-0 border-slate-200 hover:text-indigo-700 bg-slate-100  md:px-10 px-2 btn-ghost  rounded-2xl">
                          Security
                        </button>
                      </div>
                    </a>
                  </li>
                  <li
                    className="nav-item flex-auto text-center p-0 m-0"
                    role="presentation"
                  >
                    <a
                      href="#tabs-notificationFill"
                      className="
                            nav-link
                            block
                            w-22
                            lg:w-full
                            font-medium
                            text-xs
                            leading-tight
                            uppercase
                           p-0 mx-1
                          "
                      id="tabs-notification-tabFill"
                      data-bs-toggle="pill"
                      data-bs-target="#tabs-notificationFill"
                      role="tab"
                      aria-controls="tabs-notificationFill"
                      aria-selected="false"
                    >
                      <div className="notification">
                        <button className="btn btn-xs md:btn-xl normal-case my-4 lg:my-0 border-slate-200 hover:text-indigo-700 bg-slate-100  md:px-10 px-2 btn-ghost  rounded-2xl">
                          Notification
                        </button>
                      </div>
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="tabs-tabContentFill">
                  <div
                    className="tab-pane fade show active"
                    id="tabs-accountFill"
                    role="tabpanel"
                    aria-labelledby="tabs-account-tabFill"
                  >
                    <div className="profileCustomizeBody">
                      <div className="avatarUpdate mt-8 flex justify-between bg-indigo-50 px-6 py-6 rounded-xl">
                        <td>
                          <div className="flex items-center lg:space-x-3">
                            <div className="avatar">
                              {
                                avatarLoading &&
                                <span className="loader"></span>
                              }
                              <div className="mask mask-squircle w-12 h-12 md:w-16 md:h-16 rounded-full">
                                {!avatarLoading &&
                                  <img
                                    className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                                    src={profile?.image ? profile?.image : Avatar}
                                    alt="Avatar"
                                  />}
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">Your Avatar</div>
                              <div className="text-sm opacity-50">
                                Profile picture size: 400px x 400px
                              </div>
                            </div>
                          </div>
                        </td>
                        <th className="mt-1">
                          {/* upload avatar jsx  */}
                          <label
                            htmlFor="uploadAvatar"
                            className="btn btn-md hover:bg-slate-200 normal-case text-black font-normal rounded-lg bg-white border-inherit border-none flex justify-center items-center">
                            <p>
                              Upload new avatar
                            </p>
                            <input
                              className="hidden"
                              type="file"
                              name="photoURL"
                              id="uploadAvatar"
                              disabled={avatarLoading}
                              onChange={handleUploadAvatar}
                            />

                          </label>
                        </th>
                      </div>
                      <div className="infoUpdate mt-10">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          {/* name field  */}
                          <div className="fullNameField lg:flex gap-8">
                            <div className="w-full mt-5 lg:pr-5 pr-0">
                              <label>First Name</label>
                              <input
                                type="text"
                                {...register("firstName", { required: true })}
                                placeholder="John"
                                className="input w-full bg-indigo-50 border-slate-300"
                              />
                            </div>
                            <div className="w-full mt-5 pr-0">
                              <label>Last Name</label>
                              <input
                                type="text"
                                {...register("lastName", { required: true })}
                                placeholder="John"
                                className="input w-full bg-indigo-50 border-slate-300"
                              />
                            </div>
                          </div>
                          {/* Email field */}
                          <div className="emailField lg:flex gap-8">
                            <div className="w-full mt-5 lg:pr-5 pr-0">
                              <label>Email</label>
                              <input
                                type="email"
                                readOnly
                                value={user?.email}
                                {...register("email")}
                                className="input w-full bg-indigo-50 border-slate-300"
                              />
                            </div>
                            <div className="mr-5 lg:mr-0 w-full">
                              <button className="input text-left mt-10 w-full   border-indigo-700 bg-indigo-50  text-indigo-700">
                                <FontAwesomeIcon
                                  icon={faStopwatch}
                                  className="mr-3"
                                />
                                E-mail confirmation in pending
                              </button>
                            </div>
                          </div>
                          <div className="phoneNumberField lg:flex gap-8">
                            <div className="w-full mt-5 lg:pr-5 pr-0">
                              <label>Phone Number</label>
                              <input
                                type="number"
                                {...register("phone", { required: true, })}
                                placeholder="01734798427"
                                className="input w-full bg-indigo-50 border-slate-300"
                              />
                            </div>
                            <div className="mr-5 lg:mr-0 w-full">
                              <button className="input text-left mt-10 w-full  border-green-500 bg-indigo-50  text-green-500">
                                <FontAwesomeIcon
                                  icon={faCheckDouble}
                                  className="mr-3"
                                />
                                Phone number confirm
                              </button>
                            </div>
                          </div>
                          <div className="idConfirmation lg:flex gap-8">
                            <div className="w-full mt-5 lg:pr-5 pr-0">
                              <label>Date of Birth </label>
                              <input
                                type="date"
                                {...register("birthday", { required: true, })}
                                placeholder="359485203928"
                                className="input w-full bg-indigo-50 border-slate-300"
                              />
                            </div>
                            <div className="w-full mt-5 ">
                              <label> Gender </label>
                              <select
                                className="input w-full bg-indigo-50 border-slate-300"
                                {...register("gender", { required: true, })}
                              >
                                <option>Male</option>
                                <option>Female</option>
                              </select>
                            </div>

                          </div>
                          <div className="address mt-5">
                            <label>Address</label>
                            <textarea
                              type="text"
                              {...register("address", { required: true, })}
                              placeholder="Road No: 534,Mirpur,Dhaka"
                              className="input w-full h-24 resize-none bg-indigo-50 border-slate-300"
                            ></textarea>
                          </div>

                          <div className="submit mt-10 ">
                            <button
                              type="submit"
                              disabled={btnSpinner}
                              className="btn normal-case border-slate-200 text-white bg-indigo-700 px-14 btn-ghost rounded-2xl hover:text-black hover:bg-indigo-400">
                              {
                                btnSpinner ? "Loading..." : "Update Profile"
                              }
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tabs-securityFill"
                    role="tabpanel"
                    aria-labelledby="tabs-security-tabFill"
                  >
                    <h1 className="text-center">Security tab is Empty</h1>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tabs-notificationFill"
                    role="tabpanel"
                    aria-labelledby="tabs-notification-tabFill"
                  >
                    <h1 className="text-center">Notification tab is Empty</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;