import React from 'react';

const PaginationButtons = ({ page, onPageChange, hasNextPage }) => (
  <div className="flex justify-center">
    <button
      onClick={() => onPageChange(page - 1)}
      disabled={page === 1}
      className="px-4 mx-2 py-1 bg-gray-200 rounded-md"
    >
      Previous
    </button>
    <div>{page}</div>
    <button
      onClick={() => {
        if (hasNextPage) {
          onPageChange(page + 1);
        }
      }}
      disabled={!hasNextPage}
      className={`px-4 mx-2 py-1 ${!hasNextPage ? 'bg-gray-300' : 'bg-gray-200'} rounded-md`}
    >
      Next
    </button>
  </div>
);

export default PaginationButtons;
