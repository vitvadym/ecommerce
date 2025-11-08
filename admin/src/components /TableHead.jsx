/* eslint-disable react/prop-types */
const TableHead = ({ columns }) => {
  return (
    <thead className='text-gray-900 text-sm text-left'>
      <tr>
        {columns?.map((column, index) => (
          <th
            key={index}
            className='px-4 py-3 font-semibold truncate'
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
