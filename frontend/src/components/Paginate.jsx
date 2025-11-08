/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Paginate({ totalPages }) {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage) => {
    setPage(newPage);
    searchParams.set('page', newPage);
    setSearchParams(searchParams);
  };

  return (
    <div className='join mt-10'>
      {totalPages > 1 &&
        [...Array(totalPages)].map((_, index) => (
          <button
            disabled={index + 1 === Number(page)}
            onClick={() => handlePageChange(index + 1)}
            key={index}
            className='btn join-item'
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
}

export default Paginate;
