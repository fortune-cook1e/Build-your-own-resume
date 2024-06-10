import { defaultTiltProps } from '@/constants/tilt';
import { FC } from 'react';
import Tilt from 'react-parallax-tilt';

interface Props {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const BaseCard: FC<Props> = ({ children, className, onClick }) => {
  return (
    <Tilt {...defaultTiltProps}>
      <div
        onClick={onClick}
        className="relative flex aspect-[1/1.4142] scale-100 cursor-pointer items-center justify-center bg-secondary/50 p-0 transition-transform active:scale-95 dark:bg-foreground"
      >
        {children}
      </div>
    </Tilt>
  );
};

export default BaseCard;
