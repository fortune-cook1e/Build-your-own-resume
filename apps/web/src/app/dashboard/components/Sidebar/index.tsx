import SidebarItem, {
  SidebarItemProps,
} from '@/app/dashboard/components/Sidebar/SidebarItem';
import { Divider, IconButton } from '@chakra-ui/react';
import { List, Bank } from '@phosphor-icons/react';
import Link from 'next/link';

const Sidebar = () => {
  const sidebarItems: SidebarItemProps[] = [
    {
      path: '/dashboard/resumes',
      name: 'Resumes',
      icon: <List />,
    },
    {
      path: '/dashboard/setting',
      name: 'Setting',
      icon: <List />,
    },
  ];

  return (
    <div className="flex- h-full flex-col gap-y-4">
      <div className="ml-12 flex justify-center mb-4 lg:ml-0">
        <IconButton
          variant="ghost"
          aria-label="home button"
          icon={
            <Link href="/">
              <Bank />
            </Link>
          }
        />
      </div>

      <Divider />

      <div className="grid gap-y-2 mt-4">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.path} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
