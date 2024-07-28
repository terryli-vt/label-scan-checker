import React, { Component } from "react";
import { getHistories } from "../services/historyService";

import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import EntrySelector from "./common/entrySelector";
import SearchBox from "./common/searchBox";

import HistoryTable from "./historyTable";

import _ from "lodash";

class History extends Component {
  state = {
    histories: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const histories = await getHistories();
      this.setState({ histories });
    } catch (error) {
      console.error("Error fetching histories:", error);
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleEntriesChange = (selectedEntry) => {
    this.setState({ pageSize: selectedEntry });
  };

  render() {
    const {
      pageSize,
      currentPage,
      histories: allHistories,
      sortColumn,
      searchQuery,
    } = this.state;

    let { length: count } = allHistories;

    if (count === 0) return <p>There is no scan record found.</p>;

    // h.datetime is in number format, so that it's easier to sort
    // need to convert this to MM/DD/YYYY format later.
    for (const h of allHistories) {
      h.dateStr = h.dateNumber;
    }

    // Filter based on search
    let filtered = allHistories;
    if (searchQuery) {
      filtered = allHistories.filter((h) =>
        h["partNumber"].toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      count = filtered.length;
    }

    // Sort
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // Convert the date in MM/DD/YYYY format
    for (const h of sorted) {
      h.dateStr = new Date(h.dateStr).toLocaleString();
    }

    // Paginate
    const histories = paginate(sorted, currentPage, pageSize);

    return (
      <div>
        <div className="flex-row-container p-2">
          <EntrySelector
            pageSize={pageSize}
            onEntriesChange={this.handleEntriesChange}
            onPageChange={this.handlePageChange}
          />
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
        </div>
        <div className="p-3">
          <HistoryTable
            histories={histories}
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

export default History;
