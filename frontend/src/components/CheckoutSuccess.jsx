import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import paymentService from '../../api/paymentService.js';
import useCartStore from '../../store/cartStore.jsx';
import { useEffect } from 'react';
import Spinner from './UI/Spinner.jsx';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');

  const { clearCart } = useCartStore();

  const { mutate, isPending, data } = useMutation({
    mutationFn: () => paymentService.checkoutSuccess({ sessionId, orderId }),
    onSuccess: () => {
      clearCart();
    },
  });

  useEffect(() => {
    if (sessionId) {
      mutate();
    }
  }, [sessionId]);

  return (
    <div className='hero'>
      <div className='hero-content text-center'>
        {isPending && <Spinner />}
        {data && !isPending && (
          <div className='max-w-md'>
            <CheckCircleIcon className='w-24 h-24 mx-auto text-success mb-5' />
            <h1 className='text-5xl font-bold mb-5 text-success-content'>
              Payment Successful
            </h1>
            <p className='mb-5'>Thank you for your purchase!</p>

            <Link to='/'>
              <button className='btn btn-primary'>Go Home</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccess;
