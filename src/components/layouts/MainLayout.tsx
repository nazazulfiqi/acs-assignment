import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Navbar from '@/components/organisms/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
      <ToastContainer />
    </main>
  );
};

export default MainLayout;
