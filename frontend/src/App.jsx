import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import authService from '../api/authService.js';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../store/authStore.jsx';
import { useEffect } from 'react';
import Checkout from './pages/Checkout.jsx';
import Payment from './pages/Payment.jsx';

const App = () => {
  const { setAuth } = useAuthStore();
  const { data } = useQuery({
    queryFn: () => authService.me(),
    queryKey: ['users'],
  });

  useEffect(() => {
    if (data) {
      setAuth(data?.data.user);
    }
  }, []);

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer
        autoClose={2000}
        hideProgressBar
      />
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/collection'
          element={<Collection />}
        />
        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/contact'
          element={<Contact />}
        />
        <Route
          path='/product/:productId'
          element={<Product />}
        />
        <Route
          path='/cart'
          element={<Cart />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/payment'
          element={<Payment />}
        />
        <Route
          path='/orders'
          element={<Orders />}
        />
        <Route
          path='/checkout'
          element={<Checkout />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
