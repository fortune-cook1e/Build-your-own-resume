import { useResumeStore } from '@/store/resume';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { SectionKey, SectionWithItem } from 'shared';
import { Eye, List, Plus } from '@phosphor-icons/react';
import { get } from 'lodash-es';
import { FC, useMemo, useState } from 'react';
import RenameInput from '@/app/builder/components/Sidebars/left/sections/common/RenameInput';

interface Props {
  id: SectionKey;
  onAddClick?: () => void;
}

const SectionOptions: FC<Props> = ({ id, onAddClick }) => {
  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id),
  ) as SectionWithItem;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const canAddItems = useMemo(() => 'items' in section, [section]);

  const toggleVisible = () => {
    const visible = section?.visible;
    setValue(`sections.${id}.visible`, !visible);
  };

  if (!section) return null;

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<List />}
        variant="outline"
      />
      <MenuList>
        {canAddItems && (
          <MenuItem onClick={onAddClick} icon={<Plus />}>
            Add a new Item
          </MenuItem>
        )}
        <MenuItem onClick={toggleVisible} icon={<Eye />}>
          {section.visible ? 'Hide' : 'Show'}
        </MenuItem>

        <MenuItem onClick={onOpen} icon={<Eye />}>
          <RenameInput
            id={id}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SectionOptions;
