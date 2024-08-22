import React, { useState } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';

const UserMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <FaUserCircle className="w-6 h-6" />
        <span>John Doe</span>
        <FaChevronDown className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
          <ul className="py-2">
            <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
              <FaUserCircle className="w-4 h-4" />
              <span>Profile</span>
            </li>
            <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
              <FaCog className="w-4 h-4" />
              <span>Settings</span>
            </li>
            <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
              <FaSignOutAlt className="w-4 h-4" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
