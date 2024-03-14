import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const TemplateWrapper: FC<Props> = ({ children }) => {
  return <div className="relative bg-white shadow-2xl">{children}</div>;
};

export default TemplateWrapper;
