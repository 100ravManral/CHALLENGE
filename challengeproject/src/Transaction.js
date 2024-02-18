import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import MonthSelect from './MonthSelect';
const ITEMS_PER_PAGE = 10;

const Transaction = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState('March');
  const [searchCriteria, setSearchCriteria] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [month, searchCriteria, currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transactionByMonth/?month=${month}&search=${searchCriteria}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
      setData(response.data.myData);
      setTotalPages(Math.ceil(response.data.totalCount / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //for monthchange component
  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
  };

  const handleSearchChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Data Table</h1>
      <div className="row mb-3">
        <div className="col-md-6">
          {/* this is the SearchBar */ }
          <SearchBar value={searchCriteria} onChange={handleSearchChange}/>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
        {/* this is the month component */ }
        <MonthSelect value={month} onChange={handleMonthChange} />
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered rounded">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.sold ? 'Yes' : 'No'}</td>
                <td><img src={item.image} alt={item.title} style={{ maxWidth: '100px' }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <p>Page: {currentPage}</p>
        </div>
        <div className="col-md-4 d-flex justify-content-center">
          <button className="btn btn-primary me-2" onClick={goToPreviousPage} disabled={currentPage === 1}>Prev</button>
          <button className="btn btn-primary" onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          <p>Per Page: {ITEMS_PER_PAGE}</p>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
