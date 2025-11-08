import { useQuery } from '@tanstack/react-query';
import productService from '../api/productService.js';
import TableHead from '../components /TableHead.jsx';
import TableProductRow from '../components /TableProductRow.jsx';
import Spinner from '../components /Spinner.jsx';
import Pagination from '../components /Pagination.jsx';
import { useSearchParams } from 'react-router-dom';

const List = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString();

  const { data, isLoading } = useQuery({
    queryFn: () => productService.getAllProducts(params),
    queryKey: ['products', params],
  });

  const columns = ['Product', 'Category', 'Price', 'Action'];

  const products = data?.data?.products ?? [];

  return (
    <>
      <div className='flex flex-col justify-between'>
        <div className='w-full'>
          <h2 className='pb-4 text-lg font-medium'>All Products</h2>
          {isLoading && !data ? (
            <Spinner />
          ) : (
            <>
              <div className='mb-5 flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
                <table className='md:table-auto table-fixed w-full overflow-hidden'>
                  <TableHead columns={columns} />

                  <tbody className='text-sm text-gray-500'>
                    {products.map((product) => (
                      <TableProductRow
                        key={product._id}
                        product={product}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination pages={data?.data?.totalPages} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default List;
