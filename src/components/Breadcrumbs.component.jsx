import React from 'react';

const Breadcrumbs = () => {
  return (
    <nav className="text-gray-600">
      <ol className="list-reset flex">
        <li>
          <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
        </li>
        <li>
          <span className="mx-2">/</span>
        </li>
        <li className="text-gray-500">Dashboard</li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
