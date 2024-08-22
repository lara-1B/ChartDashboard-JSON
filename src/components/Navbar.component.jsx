import React, { useState } from 'react';
import Breadcrumbs from './Breadcrumbs.component';
import SearchBar from './Searchbar.component'; 
import Notifications from './Notification.component';
import UserMenu from './Usermenu.component';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); 
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Breadcrumbs />
      </div>
      <div className="flex items-center space-x-4">
        <SearchBar value={searchTerm} onChange={handleSearchChange} /> {/* Pass value and onChange */}
        <Notifications />
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
