/* eslint-disable react/prop-types */

const Input = ({ type, placeholder, value, onChange, ...props }) => {
  return (
    <input
      className='w-full px-3 py-2 border border-gray-800'
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Input;
