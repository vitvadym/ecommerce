/* eslint-disable react/prop-types */

const WhyChooseUs = ({ title, text }) => {
  return (
    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
      <b>{title}</b>
      <p className=' text-gray-600'>
        {text}
      </p>
    </div>
  );
};

export default WhyChooseUs;
