import { useResumeStore } from '@/store/resume';

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
import { FC, useMemo } from 'react';
import Rename from '@/app/builder/components/Sidebars/left/sections/common/Rename';
import {
  useBoolean,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'ui';

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

  const [renameOpen, { toggle: renameToggle, on: renameOn, off: renameOff }] =
    useBoolean();

  const [removeOpen, { on: removeOnOpen, toggle: removeToggle }] = useBoolean();

  const canAddItems = useMemo(() => 'items' in section, [section]);

  const toggleVisible = () => {
    const visible = section?.visible;
    setValue(`sections.${id}.visible`, !visible);
  };

  const isCustomSection = id.startsWith('customs.');

  if (!section) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <List />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {canAddItems && (
            <DropdownMenuItem onClick={onAddClick}>
              <Plus className="mr-2" /> Add a new Item
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={toggleVisible}>
            {section.visible ? (
              <EyeSlash className="mr-2" />
            ) : (
              <Eye className="mr-2" />
            )}
            {section.visible ? 'Hide' : 'Show'}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={renameOn}>
            <Pencil className="mr-2" /> Rename
          </DropdownMenuItem>

          <DropdownMenuItem onClick={removeOnOpen} disabled={!isCustomSection}>
            <Trash className="mr-2 text-error" /> Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Rename
        id={id}
        open={renameOpen}
        onClose={renameOff}
        toggle={renameToggle}
      />

      <AlertDialog open={removeOpen} onOpenChange={removeToggle}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Custom Section</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onRemoveCustomSection(id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SectionOptions;
