import { useResumeStore } from '@/store/resume';
import { Label, Slider } from 'ui';

const LineHeight = () => {
  const pageValue = useResumeStore((state) => state.resume.data.metadata.page);
  const setValue = useResumeStore((state) => state.setValue);

  const onLineHeightChange = (value: number[]) => {
    setValue('metadata.page.font.lineHeight', value[0]);
  };

  return (
    <div className="space-y-4">
      <Label className="font-bold">LineHeight</Label>
      <div className="flex justify-between gap-x-4">
        <Slider
          value={[pageValue.font.lineHeight]}
          max={3}
          step={0.05}
          onValueChange={onLineHeightChange}
        />
        <Label className="font-bold">{pageValue.font.lineHeight}</Label>
      </div>
    </div>
  );
};

export default LineHeight;
