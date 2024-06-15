import { useResumeStore } from '@/store/resume';
import { useEffect, useState } from 'react';
import { fonts } from 'shared';
import webFontLoader from 'webfontloader';
import { Button, Label, Combobox, ComboboxOption } from 'ui';

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
  const [subsetOptions, setSubsetOptions] = useState<ComboboxOption[]>([]);
  const [variantsOptions, setVariantsOptions] = useState<ComboboxOption[]>([]);

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
      fonts
        .find((item) => item.family === fontValue.family)
        ?.subsets.map((item) => ({ label: item, value: item })) ?? [];
    const variants =
      fonts
        .find((item) => item.family === fontValue.family)
        ?.variants.map((item) => ({ label: item, value: item })) ?? [];

    setSubsetOptions(subsets);
    setVariantsOptions(variants);
  }, [fontValue.family]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold">Font family</h3>
      <div className="grid grid-cols-2 gap-4">
        {FONT_FAMILYS.map((item) => (
          <Button
            key={item}
            variant={fontValue.family === item ? 'default' : 'outline'}
            style={{ fontFamily: item }}
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
        <div className="space-y-4">
          <Label className="font-bold">Font Subset</Label>
          <Combobox
            options={subsetOptions}
            value={fontValue.subset}
            searchPlaceholder="Search for a font subset"
            onValueChange={(value) =>
              setValue('metadata.page.font.subset', value)
            }
          />
        </div>

        <div className="space-y-4">
          <Label className="font-bold">Font Variants</Label>
          <Combobox
            multiple
            options={variantsOptions}
            value={fontValue.variants}
            searchPlaceholder="Search for a font variant"
            onValueChange={(value) =>
              setValue('metadata.page.font.variants', value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Font;
