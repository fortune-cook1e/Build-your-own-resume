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
import { useResumeStore } from '@/store/resume';

const Spacing = () => {
  const pageValue = useResumeStore((state) => state.resume.data.metadata.page);
  const setValue = useResumeStore((state) => state.setValue);
  const [showSpacingTooltip, setShowSpacingTooltip] = useState(false);

  const onSpacingChange = (value: number) => {
    setValue('metadata.page.spacing', value);
  };
  return (
    <FormControl>
      <FormLabel>Spacing</FormLabel>
      <Slider
        value={pageValue.spacing}
        onChange={onSpacingChange}
        max={50}
        onMouseEnter={() => setShowSpacingTooltip(true)}
        onMouseLeave={() => setShowSpacingTooltip(false)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="blue.500"
          color="white"
          placement="top"
          isOpen={showSpacingTooltip}
          label={`${pageValue.spacing}px`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </FormControl>
  );
};

export default Spacing;
