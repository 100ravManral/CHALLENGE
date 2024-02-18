// SearchBar.js
import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;
