import { useResumeStore } from '@/store/resume';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Portal,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { SectionKey, SectionWithItem } from 'shared';
import {
  Eye,
  EyeSlash,
  List,
  Pencil,
  Plus,
  Trash,
} from '@phosphor-icons/react';
import { get } from 'lodash-es';
import { FC, useMemo, useRef } from 'react';
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
  const onRemoveCustomSection = useResumeStore(
    (state) => state.removeCustomeSection,
  );
  const {
    isOpen: renameOpen,
    onOpen: renameOnOpen,
    onClose: renameOnClose,
  } = useDisclosure();

  const {
    isOpen: removeOpen,
    onOpen: removeOnOpen,
    onClose: removeOnClose,
  } = useDisclosure();

  const removeCancelRef = useRef(null);
  const canAddItems = useMemo(() => 'items' in section, [section]);

  const toggleVisible = () => {
    const visible = section?.visible;
    setValue(`sections.${id}.visible`, !visible);
  };

  const isCustomSection = id.startsWith('customs.');

  if (!section) return null;

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<List />}
        variant="outline"
      />
      <Portal>
        <MenuList>
          {canAddItems && (
            <MenuItem onClick={onAddClick} icon={<Plus />}>
              Add a new Item
            </MenuItem>
          )}
          <MenuItem
            onClick={toggleVisible}
            icon={section.visible ? <EyeSlash /> : <Eye />}
          >
            {section.visible ? 'Hide' : 'Show'}
          </MenuItem>

          <MenuItem onClick={renameOnOpen} icon={<Pencil />}>
            <RenameInput
              id={id}
              isOpen={renameOpen}
              onOpen={renameOnOpen}
              onClose={renameOnClose}
            />
          </MenuItem>

          <MenuItem
            isDisabled={!isCustomSection}
            icon={<Trash className="text-red-500" />}
            onClick={removeOnOpen}
          >
            <span className="text-red-500">Remove</span>

            <AlertDialog
              isOpen={removeOpen}
              leastDestructiveRef={removeCancelRef}
              onClose={removeOnClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Custom Section
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={removeCancelRef} onClick={removeOnClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => onRemoveCustomSection(id)}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default SectionOptions;
