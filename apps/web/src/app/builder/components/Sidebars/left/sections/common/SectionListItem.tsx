import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  cn,
} from 'ui';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  DotsSix,
  Eye,
  EyeClosed,
  TrashSimple,
  PencilSimple,
} from '@phosphor-icons/react';
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
    <div
      ref={setNodeRef}
      style={style}
      className="flex border-x border-t bg-secondary/10 first-of-type:rounded-t last-of-type:rounded-b last-of-type:border-b"
    >
      <div
        {...attributes}
        {...listeners}
        className={cn(
          'flex w-5 cursor-move items-center justify-center',
          !isDragging && 'hover:bg-secondary',
        )}
      >
        <DotsSix weight="bold" size={12} />
      </div>

      <ContextMenu>
        <ContextMenuTrigger className="flex-1">
          <div
            className="w-full cursor-pointer p-4 hover:bg-secondary-accent"
            onClick={onEdit}
          >
            <h4 className="font-medium leading-relaxed">{title}</h4>
            {description && (
              <p className="truncate text-xs leading-relaxed opacity-50">
                {description}
              </p>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={onVisible}>
            <span className="mr-2">{visible ? <EyeClosed /> : <Eye />}</span>
            Visible
          </ContextMenuItem>
          <ContextMenuItem onClick={onEdit}>
            <PencilSimple className="mr-2" />
            Edit
          </ContextMenuItem>
          <ContextMenuItem onClick={onDelete} className="text-error">
            <TrashSimple className="mr-2" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default SectionListItem;
