import { Resume } from 'shared';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { set as lodashSet } from 'lodash-es';
import { produce } from 'immer';
import { debounceUpdateResume } from '@/apis/resume/update';
interface ResumeStore {
  resume: Resume;

  setResume: (resume: Resume) => void;
  setValue: (path: string, value: unknown) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  devtools(
    immer((set) => ({
      resume: {} as Resume,

      setResume: (data: Resume) => {
        set(
          produce((state: ResumeStore) => {
            state.resume = data;
          }),
        );
      },

      setValue: (path, value) => {
        set((state) => {
          if (!state.resume) return;
          // Tip: lodashset https://lodash.com/docs/4.17.15#set
          state.resume.data = lodashSet(state.resume.data, path, value);

          // Todo: update resume and postmessage to iframe
          debounceUpdateResume(JSON.parse(JSON.stringify(state.resume)));
        });
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
