import { ResumeDto } from '@/web/types/dto/resume';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { set as lodashSet } from 'lodash-es';
import { sampleResume } from '@/web/types/entity/resume/sample';
import { createId } from '@paralleldrive/cuid2';
interface ResumeStore {
  resume: ResumeDto;

  setResume: (path: string, value: unknown) => void;

  resetResume: () => void;
}

const defaultResumeData: ResumeDto = {
  id: createId(),
  title: 'sampleResume',
  createdAt: new Date(),
  updatedAt: new Date(),
  visibility: 'public',
  data: sampleResume,
};

export const useResumeStore = create<ResumeStore>()(
  devtools(
    immer((set) => ({
      resume: defaultResumeData,

      setResume: (path, value) => {
        set(
          (state) => {
            // Tip: lodashset https://lodash.com/docs/4.17.15#set
            state.resume.data = lodashSet(state.resume.data, path, value);

            // Todo: update resume and postmessage to iframe
          },
          false,
          'resume/setResume',
        );
      },

      resetResume: () => {
        set({}, true);
      },
    })),
    {
      enabled: process.env.NODE_ENV !== 'production',
      name: 'resume-store',
    },
  ),
);
