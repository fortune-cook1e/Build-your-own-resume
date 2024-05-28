import SectionBase from '@/app/builder/components/Sidebars/right/common/SectionBase';
import { useResumeStore } from '@/store/resume';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { FormEvent } from 'react';

const Palettes = [
  '#9253a1',
  '#f063a4',
  '#fcee21',
  '#f16154',
  '#76327e',
  '#1890ff',
  '#a42963',
  '#0b6a88',
  '#f89e4f',
  '#ec015a',
];

const Theme = () => {
  const theme = useResumeStore((state) => state.resume.data.metadata.theme);
  const setValue = useResumeStore((state) => state.setValue);

  const onPaletteClick = (color: string) => {
    setValue('metadata.theme.primaryColor', color);
  };

  const onPrimaryColorChange = (e: FormEvent<HTMLInputElement>) => {
    setValue('metadata.theme.primaryColor', e.currentTarget.value);
  };

  const onTextColorChange = (e: FormEvent<HTMLInputElement>) => {
    setValue('metadata.theme.textColor', e.currentTarget.value);
  };

  const onbgColorChange = (e: FormEvent<HTMLInputElement>) => {
    setValue('metadata.theme.backgroundColor', e.currentTarget.value);
  };

  return (
    <SectionBase id="theme">
      <div className="grid grid-cols-5 gap-4 mb-4">
        {Palettes.map((item) => {
          return (
            <div
              className="w-10 h-10 rounded-md cursor-pointer"
              style={{ background: item }}
              key={item}
              onClick={() => onPaletteClick(item)}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-y-4">
        <FormControl>
          <FormLabel>Primary color</FormLabel>
          <Input
            value={theme.primaryColor}
            placeholder="Primary color"
            onChange={onPrimaryColorChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Text color</FormLabel>
          <Input
            value={theme.textColor}
            placeholder="Text color"
            onChange={onTextColorChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Background color</FormLabel>
          <Input
            value={theme.backgroundColor}
            placeholder="Background color"
            onChange={onbgColorChange}
          />
        </FormControl>
      </div>
    </SectionBase>
  );
};

export default Theme;
