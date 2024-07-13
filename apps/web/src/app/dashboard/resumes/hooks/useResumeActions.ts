import {
  ResumeModalFormValues,
  defaultResumeModalValues,
} from '@/app/dashboard/resumes/components/ResumeModal';
import { FormMode } from '@/types';
import { useState } from 'react';
import { useBoolean } from 'ui';

export const useResumeActions = () => {
  const [open, setOpen] = useBoolean();
  const [payload, setPayload] = useState<ResumeModalFormValues>(
    defaultResumeModalValues,
  );

  const [mode, setMode] = useState<FormMode>('create');

  return {
    open,
    setOpen,
    payload,
    setPayload,
    mode,
    setMode,
  };
};
