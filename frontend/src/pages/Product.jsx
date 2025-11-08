import RelatedProducts from '../components/RelatedProducts';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../api/productService.js';
import useCartStore from '../../store/cartStore.jsx';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/UI/Spinner.jsx';
import cn from 'classnames';
import { toast } from 'react-toastify';
import ProductRating from '../components/ProductRating.jsx';

const Product = () => {
  const { addToCart } = useCartStore();
  const [selectedSize, setSelectedSize] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  const { productId } = useParams();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productService.getSingleProduct(productId),
  });

  const productData = data?.data?.product ?? [];
  const { _id, name, price, image } = productData;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.info('Please select a size');
      return;
    }

    const item = {
      id: _id,
      name,
      price,
      quantity: 1,
      image: image[0],
      size: selectedSize,
    };
    addToCart(item);
  };

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {isLoading && !data && (
        <div className='text-center mt-10'>
          <Spinner />
        </div>
      )}
      {isSuccess && data && (
        <>
          <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
            <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
              <div className='flex gap-3 sm:flex-col overflow-x-auto sm:overflow-y-auto justify-start sm:justify-normal sm:w-[18.7%] w-full'>
                {productData.image.map((item, index) => (
                  <img
                    onClick={() => setImageIndex(index)}
                    src={item}
                    key={index}
                    className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer'
                    alt=''
                  />
                ))}
              </div>
              <div className='w-full sm:w-[80%]'>
                <img
                  className='w-full h-auto'
                  src={productData.image[imageIndex]}
                  alt=''
                />
              </div>
            </div>

            <div className='flex-1'>
              <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
              <ProductRating rating={productData.rating} />
              <p className='mt-5 text-3xl font-medium'>
                {'$'}
                {productData.price}
              </p>
              <p className='mt-5 text-gray-500 md:w-4/5'>
                {productData.description}
              </p>
              <div className='flex flex-col gap-4 my-8'>
                <p>Size</p>
                <div className='flex gap-2'>
                  {productData.sizes.map((size, index) => (
                    <button
                      onClick={() => setSelectedSize(size)}
                      className={cn('btn', {
                        'btn-active': size === selectedSize,
                      })}
                      key={index}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className='btn btn-primary px-8 py-3'
              >
                ADD TO CART
              </button>
              <hr className='mt-8 sm:w-4/5' />
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>100% Original product.</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
          </div>
          <div className='mt-20'>
            <div className='flex'>
              <b className='border border-b-0 px-5 py-3 text-sm'>Description</b>
            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>
                An e-commerce website is an online platform that facilitates the
                buying and selling of products or services over the internet. It
                serves as a virtual marketplace where businesses and individuals
                can showcase their products, interact with customers, and
                conduct transactions without the need for a physical presence.
                E-commerce websites have gained immense popularity due to their
                convenience, accessibility, and the global reach they offer.
              </p>
              <p>
                E-commerce websites typically display products or services along
                with detailed descriptions, images, prices, and any available
                variations (e.g., sizes, colors). Each product usually has its
                own dedicated page with relevant information.
              </p>
            </div>
          </div>

          <RelatedProducts related={data?.data.relatedProducts} />
        </>
      )}
    </div>
  );
};

export default Product;
