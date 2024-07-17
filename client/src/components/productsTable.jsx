import React, { Component } from "react";
import Table from "./common/table";
class ProductsTable extends Component {
  // the columns here don't have to be in part of state
  // since it's not going to change throughout the lifecycle of this component
  columns = [
    { path: "name", label: "Part Name", sortable: true },
    { path: "partNumber", label: "Part Number", sortable: true },
    { path: "customer", label: "Customer", sortable: true },
    {
      key: "scan",
      content: <button className="btn btn-success btn-sm">Scan</button>,
      sortable: false,
    }, // scan button, the key is for handling error of "each child in an array should have a unique key prop"
  ];

  render() {
    const { products, count, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={products}
        sortColumn={sortColumn}
        onSort={onSort}
        count={count}
      />
    );
  }
}

export default ProductsTable;
