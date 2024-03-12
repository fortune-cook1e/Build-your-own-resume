import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Provider = () => {
  const handleMessage = (event: MessageEvent) => {
    console.log({ event }, window.location);
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return <Outlet />;
};

export default Provider;
