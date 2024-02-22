import { ResumeDto } from '@/web/types/dto/resume';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { set as lodashSet } from 'lodash-es';
import { sampleResume } from '@/web/types/entity/resume/sample';
import { createId } from '@paralleldrive/cuid2';
interface ResumeStore {
  resume: ResumeDto;

  setResume: (path: string, value: unknown) => void;
}

export const useResumeStore = create<ResumeStore>()(
  immer((set) => ({
    resume: {
      id: createId(),
      title: 'sampleResume',
      createdAt: new Date(),
      updatedAt: new Date(),
      visibility: 'public',
      data: sampleResume,
    },
    setResume: (path, value) => {
      set((state) => {
        // Tip: lodashset https://lodash.com/docs/4.17.15#set
        state.resume.data = lodashSet(state.resume.data, path, value);

        // Todo: update resume and postmessage to iframe
      });
    },
  })),
);
