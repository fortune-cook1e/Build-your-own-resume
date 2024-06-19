import { Resume } from 'shared';
import { FC, useState } from 'react';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  cn,
  useBoolean,
} from 'ui';
import ResumeModal, {
  ResumeModalFormValues,
} from '@/app/dashboard/resumes/components/ResumeModal';
import { FormMode } from '@/types';
import { useResumeStore } from '@/store/resume';
import BaseCard from '@/app/dashboard/resumes/components/BaseCard';
import { File, Pencil, Trash } from '@phosphor-icons/react';
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

  const onRenameClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setMode('update');
    setPayload({
      ...payload,
      ...resume,
    });
    setOpen.on();
  };

  const onDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
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
      <ResumeModal
        open={open}
        toggle={setOpen.toggle}
        onClose={setOpen.off}
        payload={payload}
        mode={mode}
      />

      <ContextMenu>
        <ContextMenuTrigger className="size-full">
          {/* <div className="absolute top-0 bottom-0">
              <Image
                src={resumeImage}
                className="size-full object-contain"
                alt={resume.title}
              />
            </div> */}

          <div
            className={cn(
              'absolute inset-x-0 bottom-0 z-10 p-4 pt-12 text-black',
            )}
          >
            <h4 className="line-clamp-2 font-medium">{title}</h4>
            <p className="line-clamp-1 text-xs opacity-75">{`Last updated ${lastUpdated}`}</p>
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem onClick={onRenameClick} className="cursor-pointer">
            <Pencil className="mr-2" />
            <span>Rename</span>
          </ContextMenuItem>
          <ContextMenuItem onClick={onResumeClick} className="cursor-pointer">
            <File className="mr-2" /> <span>Edit</span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={onDeleteClick}
            className="cursor-pointer text-error"
          >
            <Trash className="mr-2" /> <span>Delete</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </BaseCard>
  );
};

export default ResumeCard;
