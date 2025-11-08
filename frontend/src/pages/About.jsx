import Title from '../components/Title';
import { assets, WHY_CHOOSE_US } from '../assets/assets.js';
import NewsletterBox from '../components/NewsletterBox';
import WhyChooseUs from '../components/WhyChooseUs';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title
          text1={'ABOUT'}
          text2={'US'}
        />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img
          className='w-full md:max-w-[450px]'
          src={assets.about_img}
          alt=''
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            exercitationem doloribus mollitia, ipsa itaque excepturi sint,
            possimus asperiores eveniet veritatis dolore id dignissimos vitae
            repellendus eum voluptas impedit! Beatae, doloribus. Libero
            consequatur animi est voluptas voluptate sapiente delectus rem,
            quibusdam cumque.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id amet
            vero reprehenderit incidunt ex explicabo sit quaerat facere, vitae
            harum deleniti molestias suscipit eum iusto non esse accusamus qui
            iste?
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti in
            quibusdam temporibus non velit asperiores vero, omnis nesciunt
            inventore suscipit. Cupiditate, natus? Adipisci dolore atque, beatae
            sit debitis maxime fugiat.
          </p>
        </div>
      </div>

      <div className=' text-xl py-4'>
        <Title
          text1={'WHY'}
          text2={'CHOOSE US'}
        />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        {WHY_CHOOSE_US.map((item, index) => (
          <WhyChooseUs
            key={index}
            title={item.title}
            text={item.description}
          />
        ))}
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
