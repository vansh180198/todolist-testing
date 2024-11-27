import React from 'react';

function Filter({ setFilter }) {
  return (
    <div>
      <select onChange={(e) => setFilter(e.target.value)} defaultValue="All">
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  );
}

export default Filter;
