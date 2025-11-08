import { useSearchParams } from 'react-router-dom';
import Title from '../components/Title';
import ProductCard from '../components/ProductCard.jsx';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
import productService from '../../api/productService.js';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/UI/Spinner.jsx';
import Paginate from '../components/Paginate.jsx';

const Collection = () => {
  const [searchParams] = useSearchParams();

  const params = searchParams.toString();
  const { data, isLoading } = useQuery({
    queryFn: () => productService.getAllProducts(params),
    queryKey: ['all-products', params],
  });

  const isMediumScreen = useMediaQuery({ query: '(max-width: 1024px)' });

  return (
    <div className='flex flex-col lg:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className=''>
        <div
          tabIndex={0}
          className={cn(
            'collapse lg:collapse-open border-base-300 border min-w-72',
            {
              'collapse-arrow': isMediumScreen,
            },
          )}
        >
          <div className='collapse-title font-semibold'>Filters</div>
          <div className='collapse-content text-sm space-y-4'>
            <SearchBar />

            <Filter
              title={'category'}
              options={['Men', 'Women', 'Kids']}
            />

            <Filter
              title={'type'}
              options={['Topwear', 'Bottomwear', 'Winterwear']}
            />
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title
            text1={'ALL'}
            text2={'COLLECTIONS'}
          />
        </div>

        {isLoading && !data && (
          <div className='text-center mt-10'>
            <Spinner />
          </div>
        )}
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 gap-y-6'>
          {data?.data.products.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
            />
          ))}
        </div>

        <Paginate totalPages={data?.data.totalPages} />
      </div>
    </div>
  );
};

export default Collection;
