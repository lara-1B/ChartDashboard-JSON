import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative text-gray-600">
      <input
        type="search"
        name="search"
        placeholder="Search..."
        value={value} 
        onChange={onChange} 
        className="bg-gray-200 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-64 sm:w-80 md:w-96 lg:w-[400px] xl:w-[500px]"
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <FaSearch className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  );
};

export default SearchBar;
