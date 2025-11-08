import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeHandler = (event) => {
    const trimmedValue = event.target.value.trim();
    setSearchTerm(trimmedValue);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    searchParams.set('search', searchTerm);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!searchTerm) {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  }, [searchTerm]);
  return (
    <form onSubmit={onSubmitHandler}>
      <label className='input outline-none rounded-full'>
        <button type='submit'>
          <MagnifyingGlassIcon className='h-5 w-5 text-gray-400 cursor-pointer' />
        </button>
        <input
          type='search'
          required
          placeholder='Search'
          value={searchTerm}
          onChange={onChangeHandler}
        />
      </label>
    </form>
  );
};
export default SearchBar;
