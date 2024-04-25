import SectionBase from '@/app/builder/components/Sidebars/right/common/SectionBase';
import { useResumeStore } from '@/store/resume';
import { Portal } from '@chakra-ui/react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { mergeTailwindCss } from 'shared';
import { DotsSixVertical } from '@phosphor-icons/react';
import { get } from 'lodash-es';
import { useState } from 'react';
interface ColumnProps {
  id: 'main' | 'side';
  name: string;
  items: string[];
}

const Column = ({ id, name, items }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div className="relative">
        <div className="absolute inset-0 w-3/4 rounded bg-secondary/50" />

        <div className="relative z-10 p-3 pb-8">
          <p className="mb-3 text-xs font-bold">{name}</p>

          <div ref={setNodeRef} className="space-y-3">
            {items.map((section) => (
              <SortableSection key={section} id={section} />
            ))}
          </div>
        </div>
      </div>
    </SortableContext>
  );
};

type SectionProps = {
  id: string;
  isDragging?: boolean;
};

const Section = ({ id, isDragging = false }: SectionProps) => {
  const name = useResumeStore((state) =>
    get(state.resume.data.sections, `${id}.name`, id),
  ) as string;

  return (
    <div
      className={mergeTailwindCss(
        'cursor-grab rounded bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary-accent',
        isDragging && 'cursor-grabbing',
      )}
    >
      <div className="flex items-center gap-x-2">
        <DotsSixVertical size={12} weight="bold" />
        <p className="flex-1 truncate text-xs font-medium">{name}</p>
      </div>
    </div>
  );
};

interface SortableSectionProps {
  id: string;
}

const SortableSection = ({ id }: SortableSectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transition,
    opacity: isDragging ? 0.5 : 1,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Section id={id} />
    </div>
  );
};

type SortablePayload = {
  containerId: 'main' | 'side';
  index: number;
  items: string[];
};

const Layout = () => {
  const data = useResumeStore((state) => state.resume.data.metadata.layout);

  const setValue = useResumeStore((state) => state.setValue);

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };

  const onDragCancel = () => {
    setActiveId(null);
  };

  const onDragEvent = ({ active, over }: DragOverEvent | DragEndEvent) => {
    if (!over || !active.data.current) return;
    const payload = active.data.current.sortable as SortablePayload;
    // 有以下几种情况：
    // 1. main 或 side 一方没有数据
    //  1.1 会出现 over.data.current 为 undefined 情况
    // 2. main 和 side 都有数据
    //  2.1 在同一侧进行排序
    //  2.2 在非同一侧进行排序
    if (active.id === over.id) return;
    if (!over.data.current) {
      const containerId = over.id;
      const current = data[payload.containerId].toSpliced(payload.index, 1);
      const target = data[containerId as 'main' | 'side'].toSpliced(
        0,
        0,
        active.id as string,
      );
      const newLayout = {
        [payload.containerId]: current,
        [containerId]: target,
      };
      setValue('metadata.layout', newLayout);
      return;
    }

    // same side
    const containerId = over.data.current.sortable.containerId;
    if (payload.containerId === containerId) {
      const oldIndex = data[payload.containerId].findIndex(
        (item) => item === active.id,
      );
      const newIndex = data[payload.containerId].findIndex(
        (item) => item === over.id,
      );
      const sortedList = arrayMove(
        data[payload.containerId],
        oldIndex,
        newIndex,
      );
      setValue(`metadata.layout.${payload.containerId}`, sortedList);
    } else {
      const current = data[payload.containerId].toSpliced(payload.index, 1);
      const target = data[containerId as 'main' | 'side'].toSpliced(
        over.data.current.sortable.index,
        0,
        active.id as string,
      );
      const newLayout = {
        [payload.containerId]: current,
        [containerId]: target,
      };

      setValue('metadata.layout', newLayout);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    onDragEvent(event);
    setActiveId(null);
  };

  return (
    <SectionBase id="layout">
      <main className="grid gap-y-4">
        <DndContext
          sensors={sensors}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onDragCancel={onDragCancel}
          collisionDetection={closestCenter}
        >
          <div className="grid grid-cols-2 gap-x-4">
            <Column id="main" name="main" items={data.main}></Column>
            <Column id="side" name="side" items={data.side}></Column>
          </div>

          <Portal>
            <DragOverlay>
              {activeId && <Section id={activeId} isDragging />}
            </DragOverlay>
          </Portal>
        </DndContext>
      </main>
    </SectionBase>
  );
};

export default Layout;
