import React, { Component } from "react";
import Pagination from "./common/pagination";
import EntrySelector from "./common/entrySelector";
import SearchBox from "./common/searchBox";
import ProductsTable from "./productsTable";
import { getProducts } from "../services/fakeProductService";
import { paginate } from "../utils/paginate";
import "../styles/products.css";
import _ from "lodash"; // a convention to use lodash library

class Products extends Component {
  state = {
    products: getProducts(),
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }, // this object tells how do we sort the page
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  // path = target property name, like name or partNumber
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleEntriesChange = (selectedEntry) => {
    this.setState({ pageSize: selectedEntry });
  };

  render() {
    const {
      products: allProducts,
      pageSize,
      currentPage,
      searchQuery,
      sortColumn,
    } = this.state;
    let { length: count } = allProducts;

    if (count === 0) return <p>There are no products found.</p>;

    // Filter based on Search
    let filtered = allProducts;
    if (searchQuery) {
      filtered = allProducts.filter((product) =>
        product.partNumber.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      count = filtered.length;
    }

    // Sort
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // Without using lodash
    /* const sorted = allProducts.sort((a, b) => {
      const valueA = a[sortColumn.path];
      const valueB = b[sortColumn.path];
      if (sortColumn.order === "asc") {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    }); */

    // the algorithm used to paginate the data might be reused in the future, so we put that in another folder 'utils'
    const products = paginate(sorted, currentPage, pageSize);

    return (
      <div className="p-4">
        <div className="d-flex flex-row">
          <EntrySelector
            pageSize={pageSize}
            onEntriesChange={this.handleEntriesChange}
            onPageChange={this.handlePageChange}
          />
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
        </div>
        <ProductsTable
          products={products}
          count={count}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
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
