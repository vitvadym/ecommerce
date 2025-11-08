/* eslint-disable react/prop-types */

const OrderAddressInfo = ({ order }) => {
  return (
    <div className='text-sm'>
      <p className='font-medium mb-1'>
        {order.contactAddress.firstName} {order.contactAddress.lastName}
      </p>
      <p className='text-xs'>
        <span className='font-semibold mr-1.5'>email:</span>{' '}
        {order.contactAddress.email}
      </p>
      <p className='text-xs'>
        <span className='font-semibold mr-1.5'>phone:</span>{' '}
        {order.contactAddress.phone}
      </p>
      <p>
        {order.contactAddress.street}, {order.contactAddress.city},{' '}
        {order.contactAddress.zipcode}, {order.contactAddress.country}
      </p>
    </div>
  );
};

export default OrderAddressInfo;
