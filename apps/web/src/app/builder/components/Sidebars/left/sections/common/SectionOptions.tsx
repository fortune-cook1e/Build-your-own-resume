import { useSectionContext } from '@/web/app/builder/components/Sidebars/left/sections/common/SectionContext';
import { useResumeStore } from '@/web/store/resume';
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
import { get } from 'lodash-es';
import { FC } from 'react';
interface Props {
  onAddClick: () => void;
}

const SectionOptions: FC<Props> = ({ onAddClick }) => {
  const { id } = useSectionContext();

  const setResume = useResumeStore((state) => state.setResume);
  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id),
  );

  const toggleVisible = () => {
    const visible = section?.visible;
    setResume(`sections.${id}.visible`, !visible);
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
        <MenuItem onClick={onAddClick} icon={<Plus />}>
          Add a new Item
        </MenuItem>
        <MenuItem onClick={toggleVisible} icon={<Eye />}>
          {section.visible ? 'Hide' : 'Show'}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SectionOptions;
