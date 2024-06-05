import { useResumeStore } from '@/store/resume';
import {
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';

const Size = () => {
  const pageValue = useResumeStore((state) => state.resume.data.metadata.page);
  const setValue = useResumeStore((state) => state.setValue);

  const [showTooltip, setShowTooltip] = useState(false);

  const onSizeChange = (value: number) => {
    setValue('metadata.page.font.size', value);
  };

  return (
    <FormControl>
      <FormLabel>Font size</FormLabel>
      <Slider
        value={pageValue.font.size}
        onChange={onSizeChange}
        step={0.5}
        min={12}
        max={20}
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
          label={`${pageValue.font.size}px`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </FormControl>
  );
};

export default Size;
