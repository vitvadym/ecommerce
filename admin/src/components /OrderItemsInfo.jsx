/* eslint-disable react/prop-types */

const OrderItemsInfo = ({ order }) => {
  return (
    <div className='flex flex-col gap-1'>
      {order.items.map((item) => (
        <div
          key={item.id}
          className='flex flex-col'
        >
          <p className=' text-xs'>
            {item.name} <span className='font-semibold'>x {item.quantity}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrderItemsInfo;
