import React from 'react';
import Authentication from './Authentication';
import MobileNavbar from './MobileNavbar';
import Navbar from './Navbar';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Toggle from '../../Components/Components.Nahid/Toggle/Toggle';

const Header = ({ handleThemeChange, theme }) => {


  return (
    <header style={{ background: '#FCFAFA' }}
      className={` fixed top-0 h-16 flex items-center py-4 w-full text-dark z-50 px-3 shadow transition-all duration-300`}
    >
      <div className='container mx-auto h-full flex items-center justify-between max-w-7xl'>
        {/* logo */}
        <Fade left>
          <a className='flex items-center gap-1' href='/'>
            <img className="w-40" src="https://i.ibb.co/wrjf422/Untitled-1.png" alt='' />
            {/* <span className='text-2xl lg:text-3xl font-bold'>Online <span className="text-green-700 font-sarif">Bank BD</span></span> */}
          </a>
        </Fade>
        {/* nav */}
        <div className='hidden lg:block'>
          <Fade top>
            <Navbar />
          </Fade>
        </div>

        {/* Dark Mode Toggle */}
        <div className="">
          <Toggle handleThemeChange={handleThemeChange} theme={theme} />
        </div>


        {/* Authentication */}
        <div className="">
          <Zoom>
            <Authentication />
          </Zoom>
        </div>

        {/* nav mobile*/}
        <div className='lg:hidden'>
          <MobileNavbar />
        </div>
      </div>

    </header>
  );
};

export default Header;