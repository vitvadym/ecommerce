/* eslint-disable react/prop-types */

import OrderItem from './OrderItem.jsx';
const OrderList = ({ orders }) => {
  return (
    <>
      {orders?.map((order) => (
        <OrderItem
          key={order._id}
          order={order}
        />
      ))}
    </>
  );
};

export default OrderList;
