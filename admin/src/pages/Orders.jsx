import { assets } from '../assets/assets';
import Spinner from '../components /Spinner';
import { useQuery } from '@tanstack/react-query';
import orderService from '../api/orderService.js';
import OrderPaymentIndicator from '../components /OrderPaymentIndicator.jsx';
import OrderItemsInfo from '../components /OrderItemsInfo.jsx';
import OrderAddressInfo from '../components /OrderAddressInfo.jsx';
import OrderPaymentInfo from '../components /OrderPaymentInfo.jsx';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components /Pagination.jsx';

const Orders = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString();

  const { data, isLoading } = useQuery({
    queryFn: () => orderService.getAllOrders(params),
    queryKey: ['orders', params],
  });

  const orders = data?.data?.orders ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  return (
    <div className='space-y-4'>
      <h2 className='text-lg '>Orders List</h2>
      {isLoading && !data ? (
        <Spinner />
      ) : (
        orders?.map((order) => (
          <div
            key={order._id}
            className='relative flex flex-col md:grid md:grid-cols-[3fr_2fr_1fr_2fr] md:items-center gap-5 p-5 max-w-5xl rounded-md border border-gray-300 text-gray-800'
          >
            <OrderPaymentIndicator order={order} />
            <div className='flex gap-5'>
              <img
                className='w-12 h-12 object-cover opacity-60'
                src={assets.orderIcon}
                alt='boxIcon'
              />
              <OrderItemsInfo order={order} />
            </div>
            <OrderAddressInfo order={order} />

            <p className='font-medium text-base my-auto text-black/70'>
              ${order.amount}
            </p>

            <OrderPaymentInfo order={order} />
          </div>
        ))
      )}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default Orders;
