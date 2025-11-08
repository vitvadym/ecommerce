import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './pages/Layout';

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Layout />}
        >
          <Route
            path='/add-product'
            element={<Add />}
          />
          <Route
            path='/products'
            element={<List />}
          />
          <Route
            path='/orders'
            element={<Orders />}
          />
        </Route>
      </Routes>
      <ToastContainer
        hideProgressBar
        autoClose={2000}
      />
    </>
  );
};

export default App;
