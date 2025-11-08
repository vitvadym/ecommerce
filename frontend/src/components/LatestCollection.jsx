import Title from './Title';
import ProductCard from './ProductCard.jsx';
import productService from '../../api/productService.js';
import { useQuery } from '@tanstack/react-query';
import Spinner from './UI/Spinner.jsx';

const LatestCollection = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => productService.getLatestProducts(),
    queryKey: ['products'],
  });

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title
          text1={'LATEST'}
          text2={'COLLECTIONS'}
        />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      {isLoading && !data && (
        <div className='text-center mt-10'>
          <Spinner />
        </div>
      )}

      <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4 gap-y-6'>
        {data?.data.products.map((item) => (
          <ProductCard
            key={item._id}
            product={item}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
