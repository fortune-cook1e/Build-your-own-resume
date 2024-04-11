import { mergeTailwindCss } from '@/utils/styles';
import { Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

export type SidebarItemProps = {
  path: string;
  name: string;
  icon: ReactNode;
};

type Props = SidebarItemProps & {
  onClick?: () => void;
};

const ActiveIndicator = ({ classname }: { classname?: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={mergeTailwindCss(
      'size-1.5 animate-pulse rounded-full bg-info shadow-[0_0_12px] shadow-info',
      classname,
    )}
  />
);

const SidebarItem: FC<Props> = ({ path, name, icon, onClick }) => {
  const isActive = usePathname() === path;

  return (
    <Button onClick={onClick} justifyContent="start" variant="ghost">
      <Link href={path} className="w-full">
        <Flex alignItems="center">
          <div className="mr-3">{icon}</div>
          <span>{name}</span>
          {isActive && <ActiveIndicator classname="ml-auto" />}
        </Flex>
      </Link>
    </Button>
  );
};

export default SidebarItem;
