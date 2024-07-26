import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
class ProductsTable extends Component {
  // the columns here don't have to be in part of state
  // since it's not going to change throughout the lifecycle of this component
  columns = [
    { path: "name", label: "part_name", sortable: true },
    { path: "partNumber", label: "part_number", sortable: true },
    { path: "customer", label: "customer", sortable: true },
    {
      key: "scan",
      label: "action",
      content: (product) => {
        return (
          <React.Fragment>
            <Link
              className="btn btn-success btn-sm me-2"
              to="/scan"
              state={product}
            >
              {this.props.t("scan")}
            </Link>
          </React.Fragment>
        );
      },
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

/* 
withTranslation is a higher-order component (HOC) provided by the react-i18next library.
It wraps a component and provides it with translation-related props and functionality, enabling the component to use translation features.
The components wrapped by withTranslation, like productsTable, receive the t function as a prop, which it uses to access translation strings.
*/
export default withTranslation()(ProductsTable);
