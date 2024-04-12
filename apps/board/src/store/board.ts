import { ResumeData } from '@fe-cookie/resume-generator-shared';
import { create } from 'zustand';

export interface BoardStore {
  resume: ResumeData;

  setResume: (data: ResumeData) => void;
}

export const useBoardStore = create<BoardStore>()((set) => ({
  resume: {} as ResumeData,
  setResume: (resume) => set({ resume }),
}));
