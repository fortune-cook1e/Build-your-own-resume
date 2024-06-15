import { Label, Slider } from 'ui';
import { useResumeStore } from '@/store/resume';

const Spacing = () => {
  const pageValue = useResumeStore((state) => state.resume.data.metadata.page);
  const setValue = useResumeStore((state) => state.setValue);

  const onSpacingChange = (value: number[]) => {
    setValue('metadata.page.spacing', value[0]);
  };
  return (
    <div className="space-y-4">
      <Label className="font-bold">Spacing</Label>
      <div className="flex justify-between gap-x-4">
        <Slider
          value={[pageValue.spacing]}
          max={20}
          step={0.5}
          min={12}
          onValueChange={onSpacingChange}
        />
        <Label className="font-bold">{pageValue.spacing}</Label>
      </div>
    </div>
  );
};

export default Spacing;
