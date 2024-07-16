import React, { Component } from "react";

class ProductsTable extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (path === sortColumn.path) {
      // change the sorted order if necessary
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { products, count } = this.props;
    return (
      <div>
        {/* Zen Coding: table.table>thead>tr>th*4 */}
        <table className="table table-striped" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th onClick={() => this.raiseSort("name")}>Part Name</th>
              <th onClick={() => this.raiseSort("partNumber")}>Part Number</th>
              <th onClick={() => this.raiseSort("customer")}>Customer</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.partNumber}</td>
                <td>{product.customer}</td>
                <td>
                  <button className="btn btn-success btn-sm">Scan</button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>We found {count} records.</p>
      </div>
    );
  }
}

export default ProductsTable;
