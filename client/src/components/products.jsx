import React, { Component } from "react";
import Pagination from "./common/pagination";
import { getProducts } from "../services/fakeProductService";
import { paginate } from "../utils/paginate";
import "../styles/products.css";

class Products extends Component {
  state = {
    products: getProducts(),
    currentPage: 1,
    pageSize: 1,
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { products: allProducts, pageSize, currentPage } = this.state;
    const { length: count } = allProducts;

    if (count === 0) return <p>There are no products in the database.</p>;

    // the algorithm used to paginate the data might be reused in the future, so we put that in another folder 'utils'
    const products = paginate(allProducts, currentPage, pageSize);

    return (
      <div className="p-4">
        {/* Zen Coding: table.table>thead>tr>th*4 */}
        <table className="table table-striped" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col">Part Name</th>
              <th scope="col">Part Number</th>
              <th scope="col">Customer</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr>
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
        <Pagination
          totalRecordCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Products;
