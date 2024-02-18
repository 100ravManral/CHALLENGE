import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonthSelect from './MonthSelect';
const Statistics = () => {
  const [month, setMonth] = useState('March');
  const [totalSales, setTotalSales] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalUnsoldItems, setTotalUnsoldItems] = useState(0);

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/statisticsByMonth?month=${month}`);
      const { totalSaleAmount, totalSoldItems, totalUnsoldItems } = response.data;
      setTotalSales(totalSaleAmount);
      setTotalSoldItems(totalSoldItems);
      setTotalUnsoldItems(totalUnsoldItems);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };
  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Statistics</h1>
      <div className="row mb-3">
        <div className="col-md-6">
          {/* this is the SearchBar */ }
          <h4>Statistic of Current Month</h4>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
        {/* this is the month component */ }
        <MonthSelect value={month} onChange={handleMonthChange} />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="statistics-box">
          <h3>Total Sales: {totalSales}</h3>
          <h3>Total Sold Items: {totalSoldItems}</h3>
          <h3>Total Unsold Items: {totalUnsoldItems}</h3>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
