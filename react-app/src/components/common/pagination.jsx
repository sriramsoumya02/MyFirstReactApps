import React from 'react';
//import _ from 'lodash';
const Pagenation = (props) => {
  let totalrecords = props.totalrecords;
  let pageSize = props.recordsPerPage;
  let pages = Math.trunc(totalrecords / pageSize);
  let remainingPages = Math.trunc(totalrecords % pageSize);
  if (remainingPages > 0) pages++;
  let tempArray = new Array(pages).fill(1);
  let pageValue = Array.from(tempArray.keys()); //_range(1,pages+1)
  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageValue.map((page) => (
            <li
              key={page + 1}
              className={
                page + 1 === props.currentPage
                  ? 'page-item active'
                  : 'page-item'
              }
              onClick={() => props.pageClicked(page + 1)}
            >
              <a className="page-link">{page + 1}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagenation;
