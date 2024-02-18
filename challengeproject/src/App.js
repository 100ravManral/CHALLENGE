import React, { useState } from 'react';
import Transaction from './Transaction';
import Statistics from './Statistics';
import BarGraph from './BarGraph';
import NavBar from './Navbar';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('Transaction');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Transaction':
        return <Transaction />;
      case 'Statistics':
        return <Statistics />;
      case 'BarGraph':
        return <BarGraph />;
      default:
        return null;
    }
  };

  return (
    <div>
      <NavBar setActiveComponent={setActiveComponent} />
      <div className="container mt-5">
        {renderComponent()}
      </div>
    </div>
  );
};

export default App;
