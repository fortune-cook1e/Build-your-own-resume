import { URL, urlSchema } from '@/web/types/entity/resume/common/url';
import {
  Flex,
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  FormLabel,
  Box,
} from '@chakra-ui/react';
import { Tag } from '@phosphor-icons/react';
import { forwardRef } from 'react';

interface Props {
  onChange: (value: URL) => void;
  value: URL;
  domId?: string;
  placeholder?: string;
}

const UrlInput = forwardRef<any, Props>(
  ({ value, onChange, domId, placeholder }, ref) => {
    const isInvalid = urlSchema.safeParse(value).success === false;
    return (
      <Flex gap="2" alignItems="end">
        <Input
          id={domId}
          value={value.link}
          isInvalid={isInvalid}
          placeholder={placeholder || 'Your url link'}
          onChange={(event) =>
            onChange({
              ...value,
              link: event.target.value,
            })
          }
        />
        <Popover>
          <Tooltip label="Url label" aria-label="tooltip">
            <Box>
              <PopoverTrigger>
                <IconButton
                  ref={ref}
                  variant="ghost"
                  aria-label="Url label"
                  icon={<Tag></Tag>}
                ></IconButton>
              </PopoverTrigger>
            </Box>
          </Tooltip>

          <PopoverContent>
            <PopoverBody>
              <Input
                value={value.label}
                placeholder="Label"
                onChange={(event) =>
                  onChange({
                    ...value,
                    label: event.target.value,
                  })
                }
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    );
  },
);
export default UrlInput;
