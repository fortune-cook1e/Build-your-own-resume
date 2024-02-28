import RenderSectionModal from '@/web/app/builder/components/Sidebars/left/sections/common/RenderSectionModal';
import {
  SectionProvider,
  useSectionContext,
} from '@/web/app/builder/components/Sidebars/left/sections/common/SectionContext';
import { getSectionIcon } from '@/web/app/builder/components/Sidebars/left/sections/common/SectionIcon';
import SectionOptions from '@/web/app/builder/components/Sidebars/left/sections/common/SectionOptions';
import { useResumeStore } from '@/web/store/resume';
import {
  SectionItem,
  SectionKey,
  SectionWithItem,
} from '@/web/types/entity/resume/sections';
import { Flex } from '@chakra-ui/react';
import get from 'lodash-es/get';
import { useEffect, useId } from 'react';

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import SectionListItem from '@/web/app/builder/components/Sidebars/left/sections/common/SectionListItem';

interface Props<T> {
  id: SectionKey;
  title: (item: T) => string;
  description: (item: T) => string;
}

const SectionBase = <T extends SectionItem>({
  id,
  title,
  description,
}: Props<T>) => {
  const dndContextId = useId();
  const { setOpen, setCreateMode, setUpdateMode, setId } = useSectionContext();
  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id),
  ) as SectionWithItem<T>;
  const setResume = useResumeStore((state) => state.setResume);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onAddClick = () => {
    setCreateMode();
    setOpen.on();
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = section.items.findIndex((item) => item.id === active.id);
      const newIndex = section.items.findIndex((item) => item.id === over.id);
      const sortedList = arrayMove(section.items, oldIndex, newIndex);
      setResume(`sections.${id}.items`, sortedList);
    }
  };

  useEffect(() => {
    setId(id);
  }, [id, setId]);

  if (!section) return null;

  return (
    <div id={id} className="animate-fade-right animate-once">
      <Flex align="center" justifyContent="space-between" className="mb-5">
        {getSectionIcon(id)}
        <h2 className="text-3xl font-bold">{section.name}</h2>
        <SectionOptions onAddClick={onAddClick} />
      </Flex>

      <RenderSectionModal />

      <DndContext
        id={dndContextId}
        sensors={sensors}
        onDragEnd={onDragEnd}
        collisionDetection={closestCenter}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext
          items={section.items}
          strategy={verticalListSortingStrategy}
        >
          <div className="animate-fade-right animate-once">
            {section.items.map((item) => (
              <SectionListItem
                key={item.id}
                id={item.id}
                title={title(item as T)}
                description={description(item as T)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

const SectionBaseWithProvider = <T extends SectionItem>(props: Props<T>) => (
  <SectionProvider>
    <SectionBase {...props} />
  </SectionProvider>
);

export default SectionBaseWithProvider;
