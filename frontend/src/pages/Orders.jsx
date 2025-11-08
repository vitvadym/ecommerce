import Title from '../components/Title';
import orderService from '../../api/orderService.js';
import { useQuery } from '@tanstack/react-query';
import OrderList from '../components/OrderList.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => orderService.getUserOrders(),
    queryKey: ['user-orders'],
  });

  const orders = data?.data?.orders ?? [];

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load orders');
    }
  }, [isError]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title
          text1={'MY'}
          text2={'ORDERS'}
        />
      </div>

      {isLoading ? (
        <div className='flex justify-center mt-10'>
          <Spinner />
        </div>
      ) : orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <h2 className='mt-10 text-center'>No orders yet</h2>
      )}
    </div>
  );
};

export default Orders;
