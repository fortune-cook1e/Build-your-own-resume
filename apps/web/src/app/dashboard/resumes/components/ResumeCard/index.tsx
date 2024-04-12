import { mergeTailwindCss } from '@/utils/styles';
import { Resume } from '@fe-cookie/resume-generator-shared';
import { FC, useState } from 'react';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { ContextMenu } from '@/components/ContextMenu';
import { MenuItem, MenuList, useBoolean } from '@chakra-ui/react';
import ResumeModal, {
  ResumeModalFormValues,
} from '@/app/dashboard/resumes/components/ResumeModal';
import { FormMode } from '@/types';
interface Props {
  resume: Resume;
}

const ResumeCard: FC<Props> = ({ resume }) => {
  const router = useRouter();
  const [open, setOpen] = useBoolean();
  const { title, updatedAt } = resume;
  const lastUpdated = dayjs(updatedAt).format();
  const [mode, setMode] = useState<FormMode>('create');

  const [payload, setPayload] = useState<ResumeModalFormValues>({
    title: '',
    description: '',
    visibility: 'public',
  });

  const onResumeClick = () => {
    router.push(`/builder/${resume.id}`);
  };

  const onRenameClick = () => {
    setMode('update');
    setPayload({
      ...payload,
      ...resume,
    });
    setOpen.on();
  };

  const onDeleteClick = () => {
    setMode('delete');
    setPayload({
      ...payload,
      ...resume,
    });
    setOpen.on();
  };

  return (
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
      <ResumeModal
        open={open}
        onClose={setOpen.off}
        payload={payload}
        mode={mode}
      />

      <div
        onClick={onResumeClick}
        className="relative flex aspect-[1/1.4142] scale-100 space-y-0 cursor-pointer items-center justify-center bg-secondary/50 p-0 transition-transform active:scale-95"
      >
        <div
          className={mergeTailwindCss(
            'absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end space-y-0.5 p-4 pt-12',
            'bg-gradient-to-t from-background/80 to-transparent',
          )}
        >
          <h4 className="line-clamp-2 font-medium">{title}</h4>
          <p className="line-clamp-1 text-xs opacity-75">{`Last updated ${lastUpdated}`}</p>
        </div>
      </div>
    </ContextMenu>
  );
};

export default ResumeCard;
