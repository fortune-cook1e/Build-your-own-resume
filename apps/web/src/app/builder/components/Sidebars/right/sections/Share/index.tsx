import SectionBase from '@/app/builder/components/Sidebars/right/common/SectionBase';
import { useResumeStore } from '@/store/resume';
import { Input, Label, Switch, useToast } from 'ui';
import { Copy } from '@phosphor-icons/react';
import { useMemo } from 'react';

const Share = () => {
  const { toast } = useToast();
  const visibility = useResumeStore((state) => state.resume.visibility);
  const resumeId = useResumeStore((state) => state.resume.id);
  const setValue = useResumeStore((state) => state.setValue);

  const url = useMemo(() => {
    return window.origin + `/resume-generator/preview/${resumeId}`;
  }, [resumeId]);

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied to clipboard',
      description: url,
      variant: 'success',
    });
  };

  const onVisibilityChange = (value: boolean) => {
    const newVisibility = value ? 'public' : 'private';
    setValue('visibility', newVisibility);
  };

  return (
    <SectionBase id="share">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center gap-4">
          <Switch
            id="visibility"
            checked={visibility === 'public'}
            onCheckedChange={onVisibilityChange}
          />
          <div className="flex flex-col gap-1">
            <Label htmlFor="visibility" className="font-bold">
              {visibility.slice(0, 1).toUpperCase() + visibility.slice(1)}
            </Label>
            <p className="text-xs">Anyone can view and download the resume</p>
          </div>
        </div>
        {visibility === 'public' && (
          <div className="flex items-center gap-4">
            <Input value={url} onChange={() => {}} />
            <Copy size={20} className="cursor-pointer" onClick={onCopy} />
          </div>
        )}
      </div>
    </SectionBase>
  );
};

export default Share;
