import React from "react";
import { FaUser } from "react-icons/fa";

const Header = ({ title,route }) => (
  <header className='h-16  flex items-center justify-between px-6 mt-4 w-1/2'>
    <div className=' items-center'>
      <h2 className='text-2xl font-semibold text-gray-800 capitalize '>
        {title}
      </h2>
      <h2 className="text-gray-600">
        {route}
      </h2>
    </div>
  
  </header>
);

export default Header;
