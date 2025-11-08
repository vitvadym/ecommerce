import Title from './Title';
import ProductCard from './ProductCard';
import productService from '../../api/productService.js';
import { useQuery } from '@tanstack/react-query';
import Spinner from './UI/Spinner.jsx';

const BestSeller = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => productService.getBestSellingProducts(),
    queryKey: ['best-sellers'],
  });

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title
          text1={'BEST'}
          text2={'SELLERS'}
        />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {isLoading && !data && (
          <div className='text-center mt-10'>
            <Spinner />
          </div>
        )}
        {data?.data.products.map((item, index) => (
          <ProductCard
            key={index}
            product={item}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
