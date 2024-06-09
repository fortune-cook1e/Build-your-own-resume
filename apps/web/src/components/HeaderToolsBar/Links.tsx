import { GithubLogo } from '@phosphor-icons/react';
import Link from 'next/link';
import { Button } from 'ui';

const LINKS = [
  {
    label: 'Github',
    icon: (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-xl dark:text-white"
      >
        <GithubLogo size={18} />
      </Button>
    ),
    href: 'https://github.com/fortune-cook1e/resume-generator',
  },
];

const Links = () => {
  return (
    <>
      {LINKS.map((item) => (
        <Link href={item.href} key={item.label}>
          {item.icon}
        </Link>
      ))}
    </>
  );
};

export default Links;
