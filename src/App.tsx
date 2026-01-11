import { ToastContainer } from 'react-toastify';
import './App.css'
import Layout from './components/layout';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <AppRoutes />
      </Layout>
      <ToastContainer
        position="bottom-right"
        autoClose={750}
        hideProgressBar={false}
        closeOnClick draggable
        pauseOnHover />
    </>
  );
};

export default App;
