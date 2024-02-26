import { SectionKey } from '@/web/types/entity/resume/sections';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
} from '@chakra-ui/react';
import { Eye, List, Plus } from '@phosphor-icons/react';
import { FC } from 'react';
interface Props {
  id: SectionKey;
  onAddClick: () => void;
}

const SectionOptions: FC<Props> = ({ id, onAddClick }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<List />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<Plus onClick={onAddClick} />}>Add a new Item</MenuItem>
        <MenuItem icon={<Eye />}>Hide</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SectionOptions;
