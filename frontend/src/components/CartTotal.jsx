import Title from './Title';
import useCartStore from '../../store/cartStore';

const CartTotal = () => {
  const { getTotalAmount } = useCartStore();

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title
          text1={'CART'}
          text2={'TOTALS'}
        />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <b>Total</b>
          <b>${getTotalAmount()}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
