import { useResumeStore } from '@/store/resume';
import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fonts } from 'shared';
import webFontLoader from 'webfontloader';

const FONT_FAMILYS = [
  'Open Sans',
  'Merriweather',
  'Lato',
  'PT Sans',
  'Lora',
  'IBM Plex Sans',
  'IBM Plex Serif',
];

const Font = () => {
  const fontValue = useResumeStore(
    (state) => state.resume.data.metadata.page.font,
  );
  const setValue = useResumeStore((state) => state.setValue);
  const [subsetOptions, setSubsetOptions] = useState<string[]>([]);
  const [variantsOptions, setVariantsOptions] = useState<string[]>([]);

  useEffect(() => {
    for (const font of FONT_FAMILYS) {
      webFontLoader.load({
        google: {
          families: [font],
          text: font,
        },
      });
    }
  }, []);

  useEffect(() => {
    const subsets =
      fonts.find((item) => item.family === fontValue.family)?.subsets ?? [];
    setSubsetOptions(subsets);
    const variants =
      fonts.find((item) => item.family === fontValue.family)?.variants ?? [];
    setVariantsOptions(variants);
  }, [fontValue.family]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold">Font family</h3>
      <div className="grid grid-cols-2 gap-4">
        {FONT_FAMILYS.map((item) => (
          <Button
            key={item}
            variant="outline"
            fontFamily={item}
            isActive={fontValue.family === item}
            onClick={() => {
              if (fontValue.family === item) return;
              setValue('metadata.page.font.family', item);
              setValue('metadata.page.font.subset', 'latin');
              setValue('metadata.page.font.variants', ['regular']);
            }}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <FormControl>
          <FormLabel>
            <span className="font-bold">Font Subset</span>
          </FormLabel>
          <Select
            value={fontValue.subset}
            onChange={(e) => {
              setValue('metadata.page.font.subset', e.target.value);
            }}
          >
            {subsetOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* // Todo: add font variants */}
        {/* <FormControl>
          <FormLabel>
            <span className="font-bold">Font Variants</span>
          </FormLabel>
          <Select
            multiple
            value={fontValue.variants}
            onChange={(e) => {
              console.log(e.target.value);
              setValue('metadata.page.font.variants', e.target.value);
            }}
          >
            {variantsOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </FormControl> */}
      </div>
    </div>
  );
};

export default Font;
