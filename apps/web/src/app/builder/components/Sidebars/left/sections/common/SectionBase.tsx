import { getSectionIcon } from '@/web/app/builder/components/Sidebars/left/sections/common/SectionIcon';
import SectionOptions from '@/web/app/builder/components/Sidebars/left/sections/common/SectionOptions';
import { useResumeStore } from '@/web/store/resume';
import {
  SectionItem,
  SectionKey,
  SectionWithItem,
} from '@/web/types/entity/resume/sections';
import { Flex, useBoolean } from '@chakra-ui/react';
import get from 'lodash-es/get';
import { ReactNode } from 'react';

interface Props<T> {
  id: SectionKey;
  title: (item: T) => string;
}

export type Mode = 'create' | 'update';

// Todo: 这里需要注意的是 所有的 open id 等state 都要从这里根部传过去
const SectionBase = <T extends SectionItem>({ id, title }: Props<T>) => {
  const [open, setOpen] = useBoolean();

  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id),
  ) as SectionWithItem<T>;

  if (!section) return null;

  return (
    <div id={id} className="animate-fade-right animate-once">
      <Flex align="center" justifyContent="space-between">
        {getSectionIcon('profiles')}
        <h2 className="text-3xl font-bold">{section.name}</h2>
        <SectionOptions id={id} onAddClick={setOpen.on} />
      </Flex>

      {/* Todo: 这里注册所有的Modal 并且传递props */}
    </div>
  );
};

export default SectionBase;
