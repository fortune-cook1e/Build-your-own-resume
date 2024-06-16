import { urlSchema, URL } from 'shared';
import { Tag } from '@phosphor-icons/react';
import { forwardRef } from 'react';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  Input,
} from 'ui';

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
      <div className="flex items-end gap-2">
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
          <Tooltip content="Url label">
            {/* Tip: add Box to fix the bug that tooltip not showing  */}
            <PopoverTrigger asChild>
              <Button
                ref={ref}
                variant="ghost"
                aria-label="Url label"
                size="icon"
              >
                <Tag />
              </Button>
            </PopoverTrigger>
          </Tooltip>

          <PopoverContent>
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
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);
export default UrlInput;
