// BarGraph.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';
import MonthSelect from './MonthSelect'; // Assuming you have created a MonthSelect component
import './BarGraph.css';

const BarGraph = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('March');
  const chartRef = useRef(null); // Ref for the canvas element

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/barChartData?month=${selectedMonth}`);
      setBarChartData(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  // Extracting labels and data from barChartData
  const labels = barChartData.map(item => item.range);
  const data = barChartData.map(item => item.count);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Number of Items',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            barThickness: 40, // Adjust the thickness of the bars
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [labels, data]);

  const handleMonthChange = (selectedMonth) => {
    setSelectedMonth(selectedMonth);
  };
  
  return (
    <div>
      <h2>Bar Graph</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <h4>Statistics of Current Month</h4>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <MonthSelect value={selectedMonth} onChange={handleMonthChange} />
        </div>
      </div>
      <div style={{ width: '100%', height: '300px' }}>
        <canvas id="barChart" ref={chartRef} width="400" height="400"></canvas>
      </div>
    </div>
  );
};

export default BarGraph;
