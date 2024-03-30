import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const TemplatePage: FC<Props> = ({ children }) => {
  // Todo: handle dynamic fontfamily
  return (
    <div data-page={1} className="relative bg-white shadow-2xl">
      {children}
    </div>
  );
};

export default TemplatePage;
