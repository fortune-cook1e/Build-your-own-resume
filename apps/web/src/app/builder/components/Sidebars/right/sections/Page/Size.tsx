import { useResumeStore } from '@/store/resume';
import { Label, Slider } from 'ui';

const Size = () => {
  const pageValue = useResumeStore((state) => state.resume.data.metadata.page);
  const setValue = useResumeStore((state) => state.setValue);

  const onSizeChange = (value: number[]) => {
    setValue('metadata.page.font.size', value[0]);
  };

  return (
    <div className="space-y-4">
      <Label className="font-bold">Font Size</Label>
      <div className="flex justify-between gap-x-4">
        <Slider
          value={[pageValue.font.size]}
          max={20}
          step={0.5}
          min={12}
          onValueChange={onSizeChange}
        />
        <Label className="font-bold">{pageValue.font.size}</Label>
      </div>
    </div>
  );
};

export default Size;
