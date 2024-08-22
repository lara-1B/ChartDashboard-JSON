import React from 'react';

const CardContainer = ({ children }) => {
  return (
    <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 h-72 flex flex-col justify-between overflow-hidden">
      {children}
    </div>
  );
};

export default CardContainer;
