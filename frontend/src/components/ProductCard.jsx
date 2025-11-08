/* eslint-disable react/prop-types */
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import { useState } from 'react';
import cn from 'classnames';
const ProductCard = ({ product }) => {
  const { name, price, image, _id, rating, sizes } = product;

  const [sizeSelected, setSizeSelected] = useState(null);
  const { addToCart } = useCartStore();

  const handleSelectSize = (size) => {
    setSizeSelected(size);
  };

  const handleAddToCart = () => {
    const item = {
      id: _id,
      name,
      price,
      quantity: 1,
      image: image[0],
      size: sizeSelected,
    };
    addToCart(item);
  };

  return (
    <div className='card card-md bg-base-100 shadow-sm '>
      <Link to={`/product/${_id}`}>
        <figure>
          <img
            className='hover:scale-105 duration-200 object-cover h-72'
            src={image[0]}
            alt={name}
          />
        </figure>
      </Link>
      <div className='card-body'>
        <div className='text-xs'>
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSelectSize(size)}
              className={cn('btn btn-xs btn-circle mr-2 mb-2', {
                'btn-active': sizeSelected === size,
              })}
            >
              {size}
            </button>
          ))}
        </div>
        <h2 className='card-title line-clamp-1'>{name}</h2>
        <div className='card-actions justify-start items-center'>
          <p className='font-semibold text-md'>{price}$</p>
          <p className='inline-flex items-center'>
            {rating}/5{' '}
            <StarIcon
              fill='yellow'
              className='h-4 w-4 ml-1'
            />
          </p>
          <button
            disabled={!sizeSelected}
            onClick={handleAddToCart}
            className='btn btn-sm btn-circle'
          >
            <ShoppingCartIcon className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
