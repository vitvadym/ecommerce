import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBagIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useCartStore from '../../store/cartStore';
import { MENU_ITEMS } from '../../constants';
// import authService from '../../api/authService.js';
// import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
// import { AxiosError } from 'axios';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { user, clearAuth } = useAuthStore();
  const { cartItems } = useCartStore();

  const navigate = useNavigate();

  // const { mutate: logout } = useMutation({
  //   mutationFn: () => authService.logout(),
  //   onSuccess: () => {
  //     clearAuth();
  //     toast.success('Logged out successfully');
  //     navigate('/');
  //   },
  //   onError: (error) => {
  //     if (error instanceof AxiosError) {
  //       toast.error(error.response?.data.message);
  //     }
  //   },
  // });

  // console.log('current user', user);

  const logout = () => {
    clearAuth();
    navigate('/');
    toast.success('Logged out successfully');
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
        <img
          src={assets.logo_2}
          className='w-36'
          alt=''
        />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        {MENU_ITEMS.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className='flex flex-col items-center gap-1'
          >
            <p>{item.title.toUpperCase()}</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-2'>
        <Link to='/collection'>
          <button className='btn btn-ghost btn-circle'>
            <MagnifyingGlassIcon className='w-6 h-6' />
          </button>
        </Link>

        {!user && (
          <Link to='/login'>
            <button className='btn btn-ghost btn-circle'>
              <UserCircleIcon className='h-6 w-6' />
            </button>
          </Link>
        )}

        {user && (
          <>
            {user && (
              <div className='dropdown dropdown-end'>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn btn-circle btn-link m-1'
                >
                  <button className='btn btn-ghost btn-circle'>
                    <UserCircleIcon className='h-6 w-6' />
                  </button>
                </div>
                <ul
                  tabIndex='-1'
                  className='dropdown-content menu bg-base-100 rounded-box z-1 w-44 p-2 shadow-sm'
                >
                  <li>
                    <Link to='/orders'>My orders</Link>
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}

        <Link
          to='/cart'
          className='relative'
        >
          <div className='indicator'>
            <span className='indicator-item indicator-bottom badge badge-primary badge-xs right-2 bottom-3'>
              {cartItems.length}
            </span>
            <button className='btn btn-ghost btn-circle'>
              <ShoppingBagIcon className='h-6 w-6' />
            </button>
          </div>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt=''
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute z-10 top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className='flex flex-col text-gray-600'>
          <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-4 p-3 cursor-pointer'
          >
            <img
              className='h-4 rotate-180'
              src={assets.dropdown_icon}
              alt=''
            />
            <p>Back</p>
          </div>
          {MENU_ITEMS.map((item, index) => (
            <NavLink
              onClick={() => setVisible(false)}
              key={index}
              className='py-2 pl-6 border'
              to={item.path}
            >
              {item.title.toUpperCase()}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
