import { mergeTailwindCss } from 'shared';
import { Resume } from 'shared';
import { FC, useState } from 'react';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { ContextMenu } from '@/components/ContextMenu';
import { MenuItem, MenuList, useBoolean } from '@chakra-ui/react';
import ResumeModal, {
  ResumeModalFormValues,
} from '@/app/dashboard/resumes/components/ResumeModal';
import { FormMode } from '@/types';
import { useResumeStore } from '@/store/resume';
import BaseCard from '@/app/dashboard/resumes/components/BaseCard';
interface Props {
  resume: Resume;
}

const ResumeCard: FC<Props> = ({ resume }) => {
  const router = useRouter();
  const [open, setOpen] = useBoolean();
  const { title, updatedAt } = resume;
  const setResume = useResumeStore((state) => state.setResume);
  const lastUpdated = dayjs(updatedAt).format('YYYY-MM-DD HH:mm');
  const [mode, setMode] = useState<FormMode>('create');

  const [payload, setPayload] = useState<ResumeModalFormValues>({
    title: '',
    description: '',
    visibility: 'public',
  });

  const onResumeClick = () => {
    setResume(resume);
    router.push(`/builder/${resume.id}`);
  };

  const onRenameClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMode('update');
    setPayload({
      ...payload,
      ...resume,
    });
    setOpen.on();
  };

  const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMode('delete');
    setPayload({
      ...payload,
      ...resume,
    });
    setOpen.on();
  };

  return (
    <BaseCard onClick={onResumeClick}>
      <ContextMenu
        renderMenu={() => (
          <MenuList>
            <MenuItem onClick={onRenameClick}>Rename</MenuItem>
            <MenuItem onClick={onResumeClick}>Edit</MenuItem>
            <MenuItem textColor="red" onClick={onDeleteClick}>
              Delete
            </MenuItem>
          </MenuList>
        )}
      >
        <div className="size-full">
          <ResumeModal
            open={open}
            onClose={setOpen.off}
            payload={payload}
            mode={mode}
          />

          {/* <div className="absolute top-0 bottom-0">
          <Image
            src={resumeImage}
            className="size-full object-contain"
            alt={resume.title}
          />
        </div> */}

          <div
            className={mergeTailwindCss(
              'absolute inset-x-0 bottom-0 z-10 p-4 pt-12',
              'bg-gradient-to-t from-background/80 to-transparent',
            )}
          >
            <h4 className="line-clamp-2 font-medium">{title}</h4>
            <p className="line-clamp-1 text-xs opacity-75">{`Last updated ${lastUpdated}`}</p>
          </div>
        </div>
      </ContextMenu>
    </BaseCard>
  );
};

export default ResumeCard;
