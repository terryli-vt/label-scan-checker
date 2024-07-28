import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import { useTranslation } from "react-i18next";

const Table = ({ columns, sortColumn, onSort, data, count }) => {
  const { t } = useTranslation();
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
      <p>
        {t("we_found")} {count} {t("records")}.
      </p>
    </div>
  );
};

export default Table;
