import React from 'react';
const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="search"
      id="search"
      style={{ textTransform: 'lowercase' }}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder="Search"
      value={value}
      className="form-control my-2"
    />
  );
};

export default SearchBox;
