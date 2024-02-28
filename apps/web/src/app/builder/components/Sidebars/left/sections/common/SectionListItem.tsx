import { mergeTailwindCss } from '@/web/utils/styles';
import { Flex } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DotsSix } from '@phosphor-icons/react';
import { FC } from 'react';

interface SectionListItemProps {
  id: string;
  title: string;
  description: string;
}

const SectionListItem: FC<SectionListItemProps> = ({
  id,
  title,
  description,
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

      <div className="flex-1 p-4 hover:bg-secondary-accent cursor-pointer">
        <h4 className="font-medium leading-relaxed">{title}</h4>
        {description && (
          <p className="text-xs leading-relaxed opacity-50">{description}</p>
        )}
      </div>
    </Flex>
  );
};

export default SectionListItem;
