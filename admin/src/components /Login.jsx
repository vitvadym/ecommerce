import { useState } from 'react';
import { assets } from '../assets/assets.js';
import authService from '../api/authService.js';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import useAuthStore from '../store/authStore.jsx';

const Login = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState(import.meta.env.VITE_DEMO_ADMIN_EMAIL);
  const [password, setPassword] = useState(
    import.meta.env.VITE_DEMO_ADMIN_PASSWORD,
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: ({ data }) => {
      setAuth(data);
      toast.success('Login successful');
      navigate('/products');
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { email, password };
    mutate(credentials);
  };

  return (
    <div className='min-h-screen  flex flex-col items-center justify-center p-4'>
      <div className='grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4'>
        <div className='md:max-w-md w-full px-4 py-4'>
          <form onSubmit={handleSubmit}>
            <div className='mb-12'>
              <h1 className=' text-3xl font-bold'>FITORY ADMIN</h1>
            </div>

            <div>
              <label className='text-[13px] font-medium block mb-2'>
                Email
              </label>
              <div className='relative flex items-center'>
                <input
                  name='email'
                  type='text'
                  required
                  className='w-full text-sm pl-2 pr-8 py-3 outline-none'
                  placeholder='Enter email'
                  onChange={handleEmailChange}
                  value={email}
                />
              </div>
            </div>
            <div className='mt-8'>
              <label className='text-[13px] font-medium block mb-2'>
                Password
              </label>
              <div className='relative flex items-center'>
                <input
                  name='password'
                  type='password'
                  required
                  className='w-full text-sm  pl-2 pr-8 py-3 outline-none'
                  placeholder='Enter password'
                  onChange={handlePasswordChange}
                  value={password}
                />
              </div>
            </div>

            <div className='mt-10'>
              <button
                type='submit'
                className='w-full bg-black text-white py-3 text-sm font-medium cursor-pointer'
              >
                {isPending ? 'Loading...' : 'Login'}
              </button>
            </div>
          </form>
        </div>

        <div className='w-full h-full flex items-center rounded-md p-8'>
          <img
            src={assets.signInImage}
            className='w-full aspect-12/12 object-contain'
            alt='login-image'
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
