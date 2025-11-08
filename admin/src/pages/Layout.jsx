import { Outlet } from 'react-router-dom';
import LoginPage from './Login';
import Sidebar from '../components /Sidebar';
import useAuthStore from '../store/authStore.jsx';

const Layout = () => {
  const { isAuthenticated, user } = useAuthStore();
  const isAdmin = isAuthenticated && user?.isAdmin;
  return (
    <>
      {isAdmin ? (
        <div className='flex'>
          <Sidebar />
          <main className='flex-1 p-6 max-h-screen'>
            <Outlet />
          </main>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default Layout;
