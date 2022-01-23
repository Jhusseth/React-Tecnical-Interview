import React from 'react';
import AvatarDropdown from './AvatarDropdown';


const Navbar = () => {
  return (
    <nav className="flex justify-between px-4 mr-5">
      <div className="">
      </div>
      <div className="mr-3">
        <AvatarDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
