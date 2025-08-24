'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = (): React.ReactElement => {
  return <ToastContainer position="top-right" autoClose={3000} />;
};

export default ToastProvider;
