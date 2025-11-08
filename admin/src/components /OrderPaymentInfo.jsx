/* eslint-disable react/prop-types */
import dayjs from 'dayjs';

const OrderPaymentInfo = ({ order }) => {
  return (
    <div className='flex flex-col text-sm'>
      <p>Date: {dayjs(order.createdAt).format('DD-MM-YYYY HH:mm')}</p>
      <p>Payment: {order.status}</p>
    </div>
  );
};

export default OrderPaymentInfo;
