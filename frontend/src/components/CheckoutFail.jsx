import { Link } from 'react-router-dom';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import paymentService from '../../api/paymentService.js';
import Spinner from './UI/Spinner.jsx';

const CheckoutFail = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');
  const { mutate, data, isPending } = useMutation({
    mutationFn: () => paymentService.checkoutCancel({ sessionId, orderId }),
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
            <XCircleIcon className='w-24 h-24 mx-auto text-error mb-5' />
            <h1 className='text-5xl font-bold mb-5 text-error-content'>
              Payment Cancelled
            </h1>

            <Link to='/'>
              <button className='btn btn-primary'>Go Home</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutFail;
