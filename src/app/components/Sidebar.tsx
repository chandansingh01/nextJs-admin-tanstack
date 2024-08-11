import React from 'react'
import Home from './icons/Home';
import User from './icons/User';

function Sidebar() {
    return (
        <div className="flex flex-col items-center w-20 h-full bg-black p-4 space-y-4">
          {/* Icons or Navigation Links */}
          <div className="w-12 h-12 flex justify-center items-center cursor-pointer	">
            <Home/>
          </div>
          <div className="w-12 h-12 flex justify-center items-center cursor-pointer	">
            <User/>
          </div>
          {/* <div className="w-12 h-12 bg-gray-700 rounded-full"></div> */}
        </div>
      );
}

export default Sidebar