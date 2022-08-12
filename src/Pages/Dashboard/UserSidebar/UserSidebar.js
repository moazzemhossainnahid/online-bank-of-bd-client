import { faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { UserSidebarData } from '../../../Components/Components.Nahid/Data';

const UserSidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex -mt-16">
      <div className={` ${open ? "w-72" : "w-20 "} bg-gradient-to-b from-green-700 to-green-500 h-screen p-5 pt-8 relative duration-300`} >
        <img src="https://i.ibb.co/CB1yQwj/kuba-arrow-button-set-2.png" className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} alt="" />
        <div className="flex flex-col gap-x-4 items-center">
          <img src="https://i.ibb.co/6YyJT6z/Logo-Header-white.png" className={`cursor-pointer w-full mx-auto duration-500 ${open && " w-2/3 rotate-[360deg]"}`} alt="" /> <br />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`} >
            Online Bank BD
          </h1>
        </div>
        <ul className="pt-6">
          {UserSidebarData.map((data, index) => (
            <li key={index} className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-300 hover:text-rose-700 hover:bg-light-white font-semibold text-white text-sm items-center gap-x-4  ${data?.gap ? "mt-9" : "mt-5"} ${index === 0 && "bg-light-white"} `} >
              <NavLink to={data?.href} className={`${open && "hidden"} text-md origin-left duration-200`}>
              <FontAwesomeIcon className='text-2xl' icon={data?.icon} />
              </NavLink>
              <NavLink to={data?.href} className={`${!open && "hidden"} text-md origin-left flex items-center justify-center gap-2 duration-200`}>
              <FontAwesomeIcon className='text-2xl' icon={data?.icon} />
                {data?.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={`flex rounded-md p-2 mt-20 cursor-pointer hover:bg-gray-300 hover:text-rose-700 hover:bg-light-white text-white text-sm items-center gap-x-4  `}>
        <a href='/' className={`${!open && "hidden"} text-md flex items-center font-semibold origin-left duration-200`}> <FontAwesomeIcon className='text-2xl pr-2' icon={faHomeAlt}/>  Back to Homepage </a>
        <a href='/' className={`${open && "hidden"} text-md flex items-center font-semibold origin-left duration-200`}> <FontAwesomeIcon className='text-2xl pr-2' icon={faHomeAlt}/></a>
        </div>
      </div>
      <div className="h-screen max-w-7xl mx-auto flex-1 p-7">
        <Outlet />
      </div>
    </div>
  );
};

export default UserSidebar;