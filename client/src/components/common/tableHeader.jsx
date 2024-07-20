import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (path === sortColumn.path) {
      // change the sorted order if necessary
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn); // event handler to change sortColumn object
  };

  // showing up or down arrow icon, depending on the sort order
  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    const { columns, t } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((column) =>
            column.sortable ? (
              // for the key, if the column has a path, used that. Otherwise use column's key. This is for handling unique key for each child
              <th
                className="clickable"
                key={column.path || column.key}
                onClick={() => this.raiseSort(column.path)}
              >
                {t(column.label)} {this.renderSortIcon(column)}
              </th>
            ) : (
              <th key={column.path || column.key}>{t(column.label)}</th>
            )
          )}
        </tr>
      </thead>
    );
  }
}

/* 
withTranslation is a higher-order component (HOC) provided by the react-i18next library.
It wraps a component and provides it with translation-related props and functionality, enabling the component to use translation features.
*/
export default withTranslation()(TableHeader);
