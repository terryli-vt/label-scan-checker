import React, { Component } from "react";
import Pagination from "./common/pagination";
import EntrySelector from "./common/entrySelector";
import SearchBox from "./common/searchBox";
import ProductsTable from "./productsTable";
import { getProducts } from "../services/productService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash"; // a convention to use lodash library
import { withTranslation } from "react-i18next";
import "../styles/products.css";

class Products extends Component {
  state = {
    products: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }, // this object tells how do we sort the page
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const products = await getProducts();
      this.setState({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

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

    const { t } = this.props;
    let { length: count } = allProducts;

    if (count === 0) return <p>{t("no_product")}</p>;

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
      <div>
        <div className="flex-row-container p-2">
          <EntrySelector
            pageSize={pageSize}
            onEntriesChange={this.handleEntriesChange}
            onPageChange={this.handlePageChange}
          />
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <Link
            className="btn btn-primary m-3"
            style={{ whiteSpace: "nowrap" }}
            to="/product-form"
          >
            {t("add_product")}
          </Link>
        </div>
        <div className="p-3">
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
      </div>
    );
  }
}

export default withTranslation()(Products);
