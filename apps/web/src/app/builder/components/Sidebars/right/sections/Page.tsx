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
  const onSpacingChange = (value: number) => {
    setValue('metadata.page.spacing', value);
  };

  const onLineHeightChange = (value: number) => {
    setValue('metadata.page.lineHeight', value);
  };

  const [showSpacingTooltip, setShowSpacingTooltip] = useState(false);
  const [showLineHeightTooltip, setShowLineHeightTooltip] = useState(false);

  return (
    <SectionBase id="page">
      <div className="space-y-4">
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

        <FormControl>
          <FormLabel>Lineheight</FormLabel>
          <Slider
            value={pageValue.lineHeight}
            onChange={onLineHeightChange}
            max={3}
            step={0.05}
            onMouseEnter={() => setShowLineHeightTooltip(true)}
            onMouseLeave={() => setShowLineHeightTooltip(false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showLineHeightTooltip}
              label={`${pageValue.lineHeight}px`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </FormControl>
      </div>
    </SectionBase>
  );
};

export default Page;
