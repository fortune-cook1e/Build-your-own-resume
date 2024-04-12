import { useUser } from '@/apis/user/user';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

interface Props {
  size?: number;
  className?: string;
}

const UserAvatar: FC<Props> = ({ size = 36, className }) => {
  const { user } = useUser();

  if (!user) return null;

  let picture: ReactNode = null;

  if (user.avatar) {
    picture = (
      <Image
        alt={user.name}
        src={user.avatar}
        width={size}
        height={size}
        className="rounded-full"
      />
    );
  } else {
    const name = user.username.slice(0, 1).toUpperCase();
    picture = (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-full bg-secondary text-center text-[10px] font-semibold text-secondary-foreground"
      >
        {name}
      </div>
    );
  }

  return <div className={className}>{picture}</div>;
};

export default UserAvatar;
