/* eslint-disable react/prop-types */
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import useCartStore from '../../store/cartStore';
const CartItem = ({ item }) => {
  const { name, price, quantity, image, size, id } = item;
  const { addQnty, reduceQnty, removeFromCart } = useCartStore();

  return (
    <li className='list-row items-center'>
      <div>
        <img
          className='size-24'
          src={image}
          alt={name}
        />
      </div>
      <div>
        <div>{name}</div>
        <div className='text-xs uppercase font-semibold opacity-60'>
          Size: {size}
        </div>
        <div className='font-semibold mt-1'>{price}$</div>
      </div>
      <div className='flex items-center'>
        <button
          onClick={() => reduceQnty(id)}
          className='btn btn-circle btn-sm'
        >
          <MinusIcon className='h-4 w-4' />
        </button>
        <span className='mx-2'>{quantity}</span>
        <button
          onClick={() => addQnty(id)}
          className='btn btn-circle btn-sm'
        >
          <PlusIcon className='h-4 w-4' />
        </button>
      </div>
      <button
        onClick={() => removeFromCart(id)}
        className='btn btn-square btn-circle btn-ghost'
      >
        <TrashIcon className='h-4 w-4' />
      </button>
    </li>
  );
};

export default CartItem;
