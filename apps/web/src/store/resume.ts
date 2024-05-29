import { Custom, CustomSection, Resume } from 'shared';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { set as lodashSet } from 'lodash-es';
import { produce } from 'immer';
import { debounceUpdateResume } from '@/apis/resume/update';
import { createId } from '@paralleldrive/cuid2';
interface ResumeStore {
  resume: Resume;

  setResume: (resume: Resume) => void;
  setValue: (path: string, value: unknown) => void;
  resetResume: () => void;

  addCustomSection: () => void;
  removeCustomeSection: (id: string) => void;
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

          debounceUpdateResume(JSON.parse(JSON.stringify(state.resume)));
        });
      },

      resetResume: () => {
        set({}, true);
      },

      addCustomSection: () => {
        const id = createId();
        const customItem: CustomSection = {
          id,
          visible: true,
          name: 'custom section',
          items: [],
        };
        set((state) => {
          state.resume.data = lodashSet(
            state.resume.data,
            `sections.customs.${id}`,
            customItem,
          );

          state.resume.data.metadata.layout.main.push(`customs.${id}`);

          debounceUpdateResume(JSON.parse(JSON.stringify(state.resume)));
        });
      },
      removeCustomeSection: () => {},
    })),
    {
      enabled: process.env.NODE_ENV !== 'production',
      name: 'resume-store',
    },
  ),
);
