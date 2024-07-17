import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ columns, sortColumn, onSort, data, count }) => {
  // const { columns, sortColumn, onSort, data, count } = props;
  return (
    <div>
      {/* Zen Coding: table.table>thead>tr>th*4 */}
      <table className="table table-striped">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={data} columns={columns} />
      </table>
      <p>We found {count} records.</p>
    </div>
  );
};

export default Table;
