/* eslint-disable react/prop-types */
const ProductRating = ({ rating }) => {
  return (
    <div className='rating'>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className='mask mask-star'
          aria-label={`${i + 1} star`}
          aria-current={i + 1 === rating ? 'true' : 'false'}
        ></div>
      ))}
    </div>
  );
};

export default ProductRating;
