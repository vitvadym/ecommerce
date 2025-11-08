import { useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

import paymentService from '../../api/paymentService.js';
import orderService from '../../api/orderService.js';
import { useMutation } from '@tanstack/react-query';
import useCartStore from '../../store/cartStore.jsx';
import useAuthStore from '../../store/authStore.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import { toast } from 'react-toastify';

const Payment = () => {
  const { cartItems, getTotalAmount } = useCartStore();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const { mutate: createCheckoutSession, isPending} = useMutation({
    mutationFn: (data) => paymentService.createCheckoutSession(data),
    onSuccess: ({ data }) => {
      if (data.success) {
        window.location.href = data.session_url;
      }
    },
  });

  const { mutate: createOrder } = useMutation({
    mutationFn: (data) => orderService.createOrder(data),
    onSuccess: ({ data }) => {
      createCheckoutSession({
        cartItems,
        contactAddress: formData,
        orderId: data?.orderId,
      });
    },
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      toast.info('Please sign in to proceed with the payment');
      return;
    }

    const body = {
      cartItems,
      contactAddress: formData,
    };

    createOrder({
      ...body,
      amount: getTotalAmount(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'
    >
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title
            text1={'DELIVERY'}
            text2={'INFORMATION'}
          />
        </div>
        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            className='input outline-0 w-full'
            type='text'
            placeholder='First name'
          />
          <input
            required
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            className='input outline-0 w-full'
            type='text'
            placeholder='Last name'
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          className='input outline-0 w-full'
          type='email'
          placeholder='Email address'
        />
        <input
          required
          onChange={onChangeHandler}
          name='street'
          value={formData.street}
          className='input outline-0 w-full'
          type='text'
          placeholder='Street'
        />
        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            className='input outline-0 w-full'
            type='text'
            placeholder='City'
          />
          <input
            onChange={onChangeHandler}
            name='state'
            value={formData.state}
            className='input outline-0 w-full'
            type='text'
            placeholder='State'
          />
        </div>
        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            className='input outline-0 w-full'
            type='number'
            placeholder='Zipcode'
          />
          <input
            required
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            className='input outline-0 w-full'
            type='text'
            placeholder='Country'
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          className='input outline-0 w-full'
          type='number'
          placeholder='Phone'
        />
      </div>

      {/* ------------- Right Side ------------------ */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-6'>
          <div className='w-full text-end mt-8'>
            <button
              type='submit'
              className='btn btn-primary w-full'
            >
              {' '}
              {isPending ? <Spinner /> : 'CONFIRM'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Payment;
