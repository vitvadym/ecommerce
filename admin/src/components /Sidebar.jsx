import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import useAuthStore from '../store/authStore';

const Sidebar = () => {
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Confirm logout?');
    if (confirmLogout) {
      clearAuth();
    }
  };

  return (
    <div className='w-1/6 border-r border-r-gray-300 bg-gray-100 flex flex-col justify-between h-screen py-5 px-2'>
      <div className='flex flex-col gap-3'>
        <NavLink
          className='flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-l'
          to='/add-product'
        >
          <img
            className='w-5 h-5'
            src={assets.addIcon}
            alt=''
          />
          <p className='hidden md:block'>Add Product</p>
        </NavLink>

        <NavLink
          className='flex items-center gap-3 border border-gray-300  px-3 py-2 rounded-l'
          to='/products'
        >
          <img
            className='w-5 h-5'
            src={assets.listIcon}
            alt=''
          />
          <p className='hidden md:block'>Products</p>
        </NavLink>

        <NavLink
          className='flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-l'
          to='/orders'
        >
          <img
            className='w-5 h-5'
            src={assets.orderIcon}
            alt=''
          />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>

      <button
        title='Logout'
        onClick={handleLogout}
        className='inline-flex  justify-center bg-black text-white px-5 py-2 sm:px-7 sm:py-2 cursor-pointer text-xs sm:text-sm hover:scale-95 transition-transform duration-200'
      >
        <img
          className='w-7 h-7 '
          src={assets.exitIcon}
        />
      </button>
    </div>
  );
};

export default Sidebar;
