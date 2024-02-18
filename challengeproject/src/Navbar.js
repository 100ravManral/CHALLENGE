import React from 'react';
import './navbar.css';
const Navbar = ({ setActiveComponent }) => {
  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('Transaction')}>Transaction</button>
            <button onClick={() => handleNavigation('Statistics')}>Statistics</button>
            <button onClick={() => handleNavigation('BarGraph')}>BarGraph</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
