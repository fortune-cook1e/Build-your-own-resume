import { HouseSimple } from '@phosphor-icons/react';
import Link from 'next/link';
import { Button } from 'ui';

const ICONS = [
  {
    label: 'Home',
    icon: (
      <Button
        size="icon"
        variant="ghost"
        className="rounded-xl text-foreground"
      >
        <HouseSimple />
      </Button>
    ),
    href: '/',
  },
];

const Left = () => {
  return (
    <>
      {ICONS.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.icon}
        </Link>
      ))}
    </>
  );
};

export default Left;
