import { ContextMenu } from '@/web/components/ContextMenu';
import { mergeTailwindCss } from '@/web/utils/styles';
import { Flex, MenuItem, MenuList } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DotsSix, Eye, EyeClosed, TrashSimple } from '@phosphor-icons/react';
import { PencilSimple } from '@phosphor-icons/react/dist/ssr';
import { FC } from 'react';

interface SectionListItemProps {
  id: string;
  title: string;
  description: string;
  visible: boolean;
  onEdit: () => void;
  onVisible: () => void;
  onDelete: () => void;
}

const SectionListItem: FC<SectionListItemProps> = ({
  id,
  title,
  description,
  visible,
  onEdit,
  onVisible,
  onDelete,
}) => {
  const {
    setNodeRef,
    attributes,
    transition,
    transform,
    listeners,
    isDragging,
  } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
    zIndex: isDragging ? 100 : undefined,
    transition,
  };

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      className="border-x border-t bg-secondary/10 first-of-type:rounded-t last-of-type:rounded-b last-of-type:border-b"
    >
      <div
        {...attributes}
        {...listeners}
        className={mergeTailwindCss(
          'flex w-5 cursor-move items-center justify-center',
          !isDragging && 'hover:bg-secondary',
        )}
      >
        <DotsSix weight="bold" size={12} />
      </div>

      <ContextMenu
        renderMenu={() => (
          <MenuList>
            <MenuItem
              onClick={onVisible}
              icon={visible ? <EyeClosed /> : <Eye />}
            >
              Visible
            </MenuItem>
            <MenuItem onClick={onEdit} icon={<PencilSimple />}>
              Edit
            </MenuItem>
            <MenuItem onClick={onDelete} icon={<TrashSimple />} textColor="red">
              Delete
            </MenuItem>
          </MenuList>
        )}
      >
        <div
          className="flex-1 p-4 hover:bg-secondary-accent cursor-pointer"
          onClick={onEdit}
        >
          <h4 className="font-medium leading-relaxed">{title}</h4>
          {description && (
            <p className="text-xs leading-relaxed opacity-50">{description}</p>
          )}
        </div>
      </ContextMenu>
    </Flex>
  );
};

export default SectionListItem;
