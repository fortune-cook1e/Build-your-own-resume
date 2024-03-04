import { mergeTailwindCss } from '@/utils/styles';
import { Resume } from '@fe-cookie/resume-generator-shared';
import { FC } from 'react';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
interface Props {
  resume: Resume;
}

const ResumeCard: FC<Props> = ({ resume }) => {
  const router = useRouter();
  const { title, updatedAt } = resume;

  const lastUpdated = dayjs(updatedAt).format();

  const onResumeClick = () => {
    router.push(`/builder/${resume.id}`);
  };

  return (
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
  );
};

export default ResumeCard;
