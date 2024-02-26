import ProfileModal from '@/web/app/builder/components/Sidebars/left/sections/Modals/Profiles';
import {
  Section,
  SectionItem,
  SectionKey,
  SectionWithItem,
} from '@/web/types/entity/resume/sections';
import { FC, ReactNode } from 'react';

import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useBoolean,
  ModalFooter,
} from '@chakra-ui/react';
import { useResumeStore } from '@/web/store/resume';
import { get } from 'lodash-es';
import { UseFormReturn } from 'react-hook-form';

type Props<T extends SectionItem> = {
  id: SectionKey;
  form: UseFormReturn<T>;
  defaultValues: T;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

// Modal 的逻辑如下：
// 1. 这是基本modal 用于 获取 form表单数据对相应模块的数据进行更新
// 2. 并且管理Modal 的展示和关闭
// 3. 这里的 Modal 用于渲染所有 模块的表单数据

const SectionModal = <T extends SectionItem>({
  open,
  onClose,
  id,
  form,
  children,
}: Props<T>) => {
  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id),
  ) as SectionWithItem<T>;

  const onSave = () => {};

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{section.name}</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Close
          </Button>
          <Button variant="ghost">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SectionModal;
