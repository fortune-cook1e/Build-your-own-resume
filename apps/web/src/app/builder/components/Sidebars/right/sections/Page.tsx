import SectionBase from '@/app/builder/components/Sidebars/right/common/SectionBase';
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

const Page = () => {
  const pageValue = useResumeStore((state) => state.resume.data.metadata.page);
  const setValue = useResumeStore((state) => state.setValue);
  const onSliderChange = (value: number) => {
    setValue('metadata.page.spacing', value);
  };

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <SectionBase id="page">
      <FormControl>
        <FormLabel>Spacing</FormLabel>
        <Slider
          value={pageValue.spacing}
          onChange={onSliderChange}
          max={50}
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
            label={`${pageValue.spacing}px`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </FormControl>
    </SectionBase>
  );
};

export default Page;
