import ResumeModal from '@/app/resumes/components/ResumeModal';
import { useBoolean } from '@chakra-ui/react';
import { Plus } from '@phosphor-icons/react';

const AddResumeCard = () => {
  const [open, setOpen] = useBoolean();

  const onClick = () => {
    setOpen.on();
  };

  return (
    <div
      onClick={onClick}
      className="relative flex aspect-[1/1.4142] scale-100 space-y-0 cursor-pointer items-center justify-center bg-secondary/50 p-0 transition-transform active:scale-95"
    >
      <ResumeModal open={open} onClose={setOpen.off} mode="create" />
      <Plus size={40} />
    </div>
  );
};

export default AddResumeCard;
