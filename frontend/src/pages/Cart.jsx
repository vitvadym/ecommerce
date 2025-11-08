import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import useCartStore from '../../store/cartStore';
import CartItemList from '../components/CartItemList';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems } = useCartStore();

  return (
    <div className='border-t pt-14'>
      <div className=' text-2xl mb-3'>
        <Title
          text1={'YOUR'}
          text2={'CART'}
        />
      </div>
      {!cartItems.length ? (
        <div className='text-center mt-10'>
          <p>Your cart is empty</p>
          <Link
            to='/collection'
            className='mt-4 inline-block'
          >
            <button className='btn'>CONTINUE SHOPPING</button>
          </Link>
        </div>
      ) : (
        <CartItemList />
      )}

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className=' w-full text-end'>
            <Link to='/payment'>
              <button
                disabled={!cartItems.length}
                onClick={() => {}}
                className='btn btn-primary mt-6'
              >
                CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
