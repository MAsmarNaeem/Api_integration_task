import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function PaginationComponent({ onPageChange, pageCount, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
    onPageChange(selectedPage);
  };

  return (
    <div className="row">
      <div className="col d-flex justify-content-center mt-4">
        <ReactPaginate
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          forcePage={currentPage - 1}
          renderOnZeroPageCount={null}
          containerClassName="pagination justify-content-center pt-3"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
        />
      </div>
    </div>
  );
}

export default PaginationComponent;
