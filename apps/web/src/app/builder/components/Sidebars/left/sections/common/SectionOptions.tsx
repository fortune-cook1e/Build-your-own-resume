import { useResumeStore } from '@/store/resume';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import {
  SectionKey,
  SectionWithItem,
} from '@fe-cookie/resume-generator-shared';
import { Eye, List, Plus } from '@phosphor-icons/react';
import { get } from 'lodash-es';
import { FC, useMemo } from 'react';
interface Props {
  id: SectionKey;
  onAddClick?: () => void;
}

const SectionOptions: FC<Props> = ({ onAddClick, id }) => {
  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id),
  ) as SectionWithItem;

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
      </MenuList>
    </Menu>
  );
};

export default SectionOptions;
