/* eslint-disable react/prop-types */

const Button = ({ children, onClick, ...props }) => {
  return (
    <button
      className='bg-black text-white font-light px-8 py-2 mt-4'
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
