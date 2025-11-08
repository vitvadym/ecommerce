/* eslint-disable react/prop-types */
import Title from './Title';
import ProductCard from './ProductCard';

const RelatedProducts = ({ related }) => {
  return (
    <div className='my-24'>
      <div className=' text-center text-3xl py-2'>
        <Title
          text1={'YOU MAY'}
          text2={'ALSO LIKE'}
        />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related?.map((item) => (
          <ProductCard
            key={item._id}
            product={item}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
