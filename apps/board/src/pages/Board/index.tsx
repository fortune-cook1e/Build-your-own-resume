import { useBoardStore } from '@/store/board';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Board = () => {
  const metadata = useBoardStore((state) => state.resume.metadata);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--spacing',
      `${metadata.page.spacing}px`,
    );

    document.documentElement.style.setProperty(
      '--color-primary',
      `${metadata.theme.primaryColor}`,
    );
  }, [metadata]);

  return <Outlet />;
};

export default Board;
