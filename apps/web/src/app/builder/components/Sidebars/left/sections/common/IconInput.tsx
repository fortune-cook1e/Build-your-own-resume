import { forwardRef } from 'react';
import { Avatar, AvatarImage, Input, AvatarFallback } from 'ui';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const IconInput = forwardRef<any, Props>(({ value, onChange }, ref) => {
  const simpleIconCdn = 'https://cdn.simpleicons.org/';

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={`${simpleIconCdn}${value}`} />
        <AvatarFallback>{value.charAt(0)}</AvatarFallback>
      </Avatar>
      <Input
        ref={ref}
        value={value}
        placeholder="Your icon"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
});

export default IconInput;
