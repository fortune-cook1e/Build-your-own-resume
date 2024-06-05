import { useResumeStore } from '@/store/resume';
import {
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
} from '@chakra-ui/react';
import { useState } from 'react';

const LineHeight = () => {
  const pageValue = useResumeStore((state) => state.resume.data.metadata.page);
  const setValue = useResumeStore((state) => state.setValue);

  const onLineHeightChange = (value: number) => {
    setValue('metadata.page.font.lineHeight', value);
  };

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <FormControl>
      <FormLabel>Lineheight</FormLabel>
      <Slider
        value={pageValue.font.lineHeight}
        onChange={onLineHeightChange}
        max={3}
        step={0.05}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="blue.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={pageValue.font.lineHeight}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </FormControl>
  );
};

export default LineHeight;
