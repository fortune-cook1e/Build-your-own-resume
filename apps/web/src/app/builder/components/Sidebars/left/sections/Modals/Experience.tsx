import SectionModal from '@/app/builder/components/Sidebars/left/sections/common/SectionModal';
import RickEditor from '@/components/RichEditor';
import { useForm } from 'react-hook-form';

const Experience = () => {
  const form = useForm();

  return (
    <SectionModal<any> form={form} defaultValues={{ name: '2123' }}>
      <RickEditor />
    </SectionModal>
  );
};

export default Experience;
