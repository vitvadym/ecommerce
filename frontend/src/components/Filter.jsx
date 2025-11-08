/* eslint-disable react/prop-types */
import { useSearchParams } from 'react-router-dom';

const Filter = ({ title, options, ...props }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedFilters = searchParams.get(title)?.split(',') || [];
  const handleFilterChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    let selected = [...selectedFilters];

    if (isChecked) {
      if (!selected.includes(value)) {
        selected.push(value);
      }
    } else {
      selected = selected.filter((option) => option !== value);
    }

    if (!selected.length) {
      searchParams.delete(title);
    } else {
      searchParams.set(title, selected.join(','));
    }
    setSearchParams(searchParams);
  };
  return (
    <fieldset className='fieldset'>
      <legend className='fieldset-legend'>{title.toUpperCase()}</legend>
      {options.map((option) => (
        <label
          className='label'
          key={option}
        >
          <input
            type='checkbox'
            className='checkbox checkbox-xs'
            value={option}
            {...props}
            onChange={handleFilterChange}
          />
          {option}
        </label>
      ))}
    </fieldset>
  );
};

export default Filter;
