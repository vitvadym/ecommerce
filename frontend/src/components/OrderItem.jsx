/* eslint-disable react/prop-types */
import cn from 'classnames';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import paymentService from '../../api/paymentService.js';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const OrderItem = ({ order }) => {
  const { items, status, success, createdAt, sessionId, amount } = order;

  const { mutate: retryCheckout, isPending } = useMutation({
    mutationFn: (data) => paymentService.retryCheckout(data),
    onSuccess: (data) => {
      window.location.href = data.data.session_url;
    },
  });

  return (
    <div className='card bg-base-100 shadow-sm mb-7'>
      <div className='flex gap-2 p-4 flex-start'>
        {items?.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
          >
            <img
              src={item.image}
              alt={item.name}
              className='size-16'
              title={item.name}
            />
          </Link>
        ))}
      </div>
      <div className='card-body'>
        <h2 className='card-title'>
          <p>Total: ${amount}</p>

          <div>
            Payment status:
            <div
              className={cn('badge badge-sm ml-3.5', {
                'badge-success': success,
                'badge-warning': !success,
              })}
            >
              {status}
            </div>
          </div>
        </h2>

        <div className='card-actions justify-end items-center'>
          <p>Date: {dayjs(createdAt).format('MMM D, YYYY h:mm A')}</p>
          <button
            onClick={() => retryCheckout({ sessionId })}
            className={cn('btn btn-sm btn-outline', {
              hidden: success,
            })}
          >
            <ArrowPathIcon
              className={cn('size-4', {
                'animate-spin': isPending,
              })}
            />
            RETRY PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
