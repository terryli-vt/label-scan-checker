import React from "react";
import _ from "lodash"; // a convention to use lodash library

const Pagination = (props) => {
  const { totalRecordCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(totalRecordCount / pageSize); // number of pages we have
  if (pagesCount === 1) return null; // don't render anything if there's only 1 page

  const pages = _.range(1, pagesCount + 1); // create an array from 1 to pageCount. If pageCount = 3, pages = [1, 2, 3]
  return (
    <nav>
      <ul className="pagination clickable">
        {/* bootstrap pagniation */}
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === currentPage ? "page-item active" : "page-item"
            } /* highlight the page selected */
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
