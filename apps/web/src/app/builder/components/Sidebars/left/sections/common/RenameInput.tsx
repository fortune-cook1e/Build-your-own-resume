import { useResumeStore } from '@/store/resume';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { get } from 'lodash-es';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SectionKey, SectionWithItem } from 'shared';

interface Props {
  id: SectionKey;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface FormValues {
  name: string;
}

const RenameInput: FC<Props> = ({ id, isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
  });

  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id),
  ) as SectionWithItem;
  const setValue = useResumeStore((state) => state.setValue);

  useEffect(() => {
    if (isOpen) {
      reset({
        name: section.name,
      });
    }
  }, [section, isOpen, reset]);

  if (!section) return null;

  const onSubmit = (data: FormValues) => {
    setValue(`sections.${id}.name`, data.name);
    onClose();
  };

  return (
    <div>
      <span>Rename</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Please rename {section.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={errors.name as any}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="rename"
                  {...register('name', {
                    required: true,
                    maxLength: {
                      value: 10,
                      message: 'Maximum length should be 10',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button className="mr-4" variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default RenameInput;
