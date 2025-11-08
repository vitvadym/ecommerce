import authService from '../../api/authService.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import Input from './UI/Input';
import Button from './UI/Button.jsx';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/authStore.jsx';

const SignIn = () => {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => authService.login(data),
    onSuccess: (data) => {
      localStorage.setItem('token', data?.data.token);
      setAuth(data?.data.user);
      setFormFields({ email: '', password: '' });
      navigate('/');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Logged in successfully');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(formFields);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <h1 className='prata-regular text-3xl'>Sign In</h1>
      <Input
        type='email'
        name='email'
        onChange={handleChange}
        value={formFields.email}
        placeholder='Email'
        required
      />
      <Input
        type='password'
        name='password'
        onChange={handleChange}
        value={formFields.password}
        placeholder='Password'
        required
      />
      <div className='w-full flex justify-between text-sm -mt-2'>
        <Link to='#'>Forgot Password?</Link>
        <Link to='/register'>Sign Up</Link>
      </div>
      <Button
        disabled={isPending}
        type='submit'
      >
        {isPending ? 'Loading...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default SignIn;
