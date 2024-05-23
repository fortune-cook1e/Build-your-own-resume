import { useUploadImage } from '@/apis/oss/uploadImage';
import { useUpdateUser } from '@/apis/user/update';
import { useUser } from '@/apis/user/user';
import { Input, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { FC, ReactNode, forwardRef, useRef } from 'react';
import { mergeTailwindCss } from 'shared';

interface Props {
  size?: number;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const UserAvatar = forwardRef<any, Props>(
  ({ size = 36, className, value, onChange }, ref: any) => {
    const { user } = useUser();
    const { uploadImage } = useUploadImage();
    const { updateUser } = useUpdateUser();
    const toast = useToast();
    const uploadInputRef = useRef<HTMLInputElement>(null);

    if (!user) return null;

    let picture: ReactNode = null;

    const onSelectImage = async (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      if (event.target.files && !!event.target.files.length) {
        const file = event.target.files[0];
        const avatarUrl = await uploadImage(file);
        await updateUser({
          avatar: avatarUrl,
        });
        toast({
          status: 'success',
          title: 'Upload avatar success',
        });
        onChange?.(avatarUrl);
      }
    };

    if (value) {
      picture = (
        <div style={{ width: size, height: size }}>
          <Image
            alt={user.name}
            src={value}
            width={size}
            height={size}
            className="rounded-full w-[50px] h-[50px]"
          />
        </div>
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

    return (
      <div className={mergeTailwindCss(className, 'cursor-pointer')}>
        <div onClick={() => uploadInputRef.current?.click()}>{picture}</div>
        <Input
          type="file"
          hidden
          ref={uploadInputRef}
          onChange={onSelectImage}
        />
      </div>
    );
  },
);

export default UserAvatar;
