import { useUploadImage } from '@/apis/oss/uploadImage';
import { useUpdateUser } from '@/apis/user/update';
import { useUser } from '@/apis/user/user';
import { forwardRef, useRef } from 'react';
import { useToast, Input, cn, Avatar, AvatarImage, AvatarFallback } from 'ui';

interface Props {
  size?: number;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const UserAvatar = forwardRef<any, Props>(
  ({ size = 36, className, value, onChange }) => {
    const { user } = useUser();
    const { uploadImage } = useUploadImage();
    const { updateUser } = useUpdateUser();
    const { toast } = useToast();
    const uploadInputRef = useRef<HTMLInputElement>(null);

    if (!user) return null;

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

    const name = user.username.slice(0, 1).toUpperCase();

    return (
      <div className={cn(className, 'cursor-pointer')}>
        <Avatar onClick={() => uploadInputRef.current?.click()}>
          <AvatarImage src={value} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
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
