import React from 'react';

const SearchComponent = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
