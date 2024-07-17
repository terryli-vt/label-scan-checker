import React, { Component } from "react";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content; // if that column has content property (like a button)
    return item[column.path];
  };

  createKey = (item, column) => {
    // to create a unique key for each child of <td>, we combine the id, and column key or path, depending on which column it is
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
