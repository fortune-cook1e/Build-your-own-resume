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
import { useEffect } from 'react';

interface Props<T> {
  id: SectionKey;
  title: (item: T) => string;
}

const SectionBase = <T extends SectionItem>({ id, title }: Props<T>) => {
  const { setOpen, setCreateMode, setUpdateMode, setId } = useSectionContext();
  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id),
  ) as SectionWithItem<T>;

  const onAddClick = () => {
    setCreateMode();
    setOpen.on();
  };

  useEffect(() => {
    setId(id);
  }, [id, setId]);

  if (!section) return null;

  return (
    <div id={id} className="animate-fade-right animate-once">
      <Flex align="center" justifyContent="space-between">
        {getSectionIcon(id)}
        <h2 className="text-3xl font-bold">{section.name}</h2>
        <SectionOptions onAddClick={onAddClick} />
      </Flex>

      <RenderSectionModal />
    </div>
  );
};

const SectionBaseWithProvider = <T extends SectionItem>(props: Props<T>) => (
  <SectionProvider>
    <SectionBase {...props} />
  </SectionProvider>
);

export default SectionBaseWithProvider;
