import React from "react";

const TablePagination = ({
  currentPage,
  totalRows,
  rowsPerPage,
  onNextPage,
  onPreviousPage,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRangeStart = indexOfFirstRow + 1;
  const currentRangeEnd = Math.min(indexOfLastRow, totalRows);
  return (
    <div className="flex justify-center md:justify-end flex-wrap gap-3  h-auto bg-[#F8FAFC] px-3">
      <div className="flex items-center gap-5 text-[#64748B] py-2">
        <span className="font-montserrat text-[14px] font-medium leading-[17.07px] text-left">
          {currentRangeStart}-{currentRangeEnd} of {totalRows}
        </span>
        <span className="font-montserrat text-[14px] font-medium leading-[17.07px] text-left">
          Rows per page: {rowsPerPage}
        </span>
      </div>
      <div className="flex gap-[4px] items-center py-2">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 font-montserrat text-sm font-medium leading-[17.07px] rounded-[9px] text-[14px] border-[#E2E8F0] border ${
            currentPage === 1
              ? "bg-[#F1F2F4] text-[#B4BFCD]"
              : "bg-[#F8FAFC] text-[#1A55A5]"
          }`}
        >
          Previous
        </button>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 font-montserrat text-sm font-medium leading-[17.07px] rounded-[9px] text-[14px] border-[#E2E8F0] border ${
            currentPage === totalPages
              ? "bg-[#F1F2F4] text-[#B4BFCD]"
              : "bg-[#F8FAFC] text-[#1A55A5]"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
