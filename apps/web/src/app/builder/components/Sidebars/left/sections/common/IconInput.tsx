import { Avatar, Flex, Input } from '@chakra-ui/react';
import { forwardRef } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const IconInput = forwardRef<any, Props>(({ value, onChange }, ref) => {
  const simpleIconCdn = 'https://cdn.simpleicons.org/';

  return (
    <Flex gap={2} align="center">
      <Avatar size="sm" name="Icon" src={`${simpleIconCdn}${value}`} />
      <Input
        ref={ref}
        value={value}
        placeholder="Your icon"
        onChange={(event) => onChange(event.target.value)}
      />
    </Flex>
  );
});

export default IconInput;
