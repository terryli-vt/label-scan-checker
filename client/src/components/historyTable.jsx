import React, { Component } from "react";
import Table from "./common/table";

class HistoryTable extends Component {
  columns = [
    { path: "name", label: "part_name", sortable: true },
    { path: "partNumber", label: "part_number", sortable: true },
    { path: "dateStr", label: "date", sortable: true },
    { path: "match", label: "match", sortable: true },
    {
      path: "mismatch",
      label: "unmatch",
      sortable: true,
    },
    {
      path: "unscannable",
      label: "unscannable",
      sortable: true,
    },
  ];

  render() {
    const { histories, count, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={histories}
        sortColumn={sortColumn}
        onSort={onSort}
        count={count}
      />
    );
  }
}

export default HistoryTable;
