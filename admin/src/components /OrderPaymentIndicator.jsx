/* eslint-disable react/prop-types */
import cn from 'classnames';

const OrderPaymentIndicator = ({ order }) => {
  return (
    <div
      className={cn(
        'absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full',
        order.success ? 'bg-green-500' : 'bg-yellow-500',
      )}
    ></div>
  );
};

export default OrderPaymentIndicator;
