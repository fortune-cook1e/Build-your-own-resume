import BaseCard from '@/app/dashboard/resumes/components/BaseCard';
import ResumeModal from '@/app/dashboard/resumes/components/ResumeModal';
import { Plus } from '@phosphor-icons/react';
import { useBoolean } from 'ui';

const AddResumeCard = () => {
  const [open, setOpen] = useBoolean();

  const onClick = () => {
    setOpen.on();
  };

  return (
    <BaseCard onClick={onClick}>
      <ResumeModal open={open} onClose={setOpen.off} mode="create" />
      <Plus size={40} />
    </BaseCard>
  );
};

export default AddResumeCard;
