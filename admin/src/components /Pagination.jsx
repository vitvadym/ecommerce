/* eslint-disable react/prop-types */
import { assets } from '../assets/assets.js';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useState } from 'react';

const Pagination = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pages) return;

    setCurrentPage(newPage);
    searchParams.set('page', newPage);
    setSearchParams(searchParams);
  };

  return (
    <div className='flex items-center gap-8'>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={cn('cursor-pointer p-2')}
      >
        <img
          className='w-4 h-4'
          src={assets.leftArrow}
          alt='left arrow'
        />
      </button>

      <p className='text-slate-600'>
        Page <strong className='text-slate-800'>{currentPage}</strong> of&nbsp;
        <strong className='text-slate-800'>{pages}</strong>
      </p>

      <button
        className={cn('cursor-pointer p-2')}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <img
          className='w-4 h-4'
          src={assets.rightArrow}
          alt='right arrow'
        />
      </button>
    </div>
  );
};

export default Pagination;
