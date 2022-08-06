import { faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { SidebarData } from '../../../../../Components/Components.Nahid/Data';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="flex -mt-16">
      <div className={` ${open ? "w-72" : "w-20 "} bg-purple-400 h-screen p-5 pt-8 relative duration-300`} >
        <img src="https://freesvg.org/img/kuba_arrow_button_set_2.png" className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} alt="" />
        <div className="flex flex-col gap-x-4 items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/OeBB_Logo_1998.svg/2560px-OeBB_Logo_1998.svg.png" className={`cursor-pointer w-full mx-auto duration-500 ${open && " w-2/3 rotate-[360deg]"}`} alt="" /> <br />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`} >
            Online Bank BD
          </h1>
        </div>
        <ul className="pt-6">
          {SidebarData.map((data, index) => (
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
        <FontAwesomeIcon className='text-2xl' icon={faHomeAlt}/>
        <button onClick={() => navigate('/')} className={`${!open && "hidden"} text-md font-semibold origin-left duration-200`}>  Back to Homepage </button>
        </div>
      </div>
      <div className="h-screen flex-1 p-7">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;