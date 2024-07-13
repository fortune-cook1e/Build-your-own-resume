import SidebarItem, {
  SidebarItemProps,
} from '@/app/dashboard/components/Sidebar/SidebarItem';
import { Separator, Button } from 'ui';
import { List, HouseSimple } from '@phosphor-icons/react';
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
    <div className="flex h-full flex-col gap-y-4">
      <div className="ml-12 flex justify-center lg:ml-0">
        <Link href="/">
          <Button
            variant="ghost"
            aria-label="home button"
            icon={<HouseSimple className="text-foreground" />}
          />
        </Link>
      </div>

      <Separator />

      <div className="mt-4 grid gap-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.path} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
