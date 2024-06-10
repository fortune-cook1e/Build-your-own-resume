import SidebarItem, {
  SidebarItemProps,
} from '@/app/dashboard/components/Sidebar/SidebarItem';
import { Divider, IconButton } from '@chakra-ui/react';
import { List, Bank } from '@phosphor-icons/react';
import Link from 'next/link';

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

const Sidebar = () => {
  return (
    <div className="flex- h-full flex-col gap-y-4">
      <div className="mb-4 ml-12 flex justify-center lg:ml-0">
        <IconButton
          variant="ghost"
          aria-label="home button"
          icon={
            <Link href="/">
              <Bank className="text-foreground" />
            </Link>
          }
        />
      </div>

      <Divider />

      <div className="mt-4 grid gap-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.path} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
