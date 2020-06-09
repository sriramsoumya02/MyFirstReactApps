import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
const Table = ({ headerValues, selectedSort, data, onSort }) => {
  return (
    <table className="table">
      <TableHeader
        headerValues={headerValues}
        onSort={onSort}
        selectedSort={selectedSort}
      />
      <TableBody data={data} headerValues={headerValues} />
    </table>
  );
};

export default Table;
