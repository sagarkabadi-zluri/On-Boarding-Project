import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-blue-600 p-3 flex justify-between items-center">
      <button className="text-white  px-4 rounded">
      &#8592;
</button>

      
      <div className="flex items-center space-x-4 px-10">
        <button className="text-white">🔔</button>
        <img
          className="w-8 h-8 rounded-full"
          src="https://via.placeholder.com/40"
          alt="profile"
        />
        <div className="text-white">
          <p>Jason Lee L.W.</p>
          <p className="text-xs">Sales Lead</p>
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
