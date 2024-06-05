import SectionBase from '@/app/builder/components/Sidebars/right/common/SectionBase';
import Font from '@/app/builder/components/Sidebars/right/sections/Page/Font';
import LineHeight from '@/app/builder/components/Sidebars/right/sections/Page/LineHeight';
import Size from '@/app/builder/components/Sidebars/right/sections/Page/Size';
import Spacing from '@/app/builder/components/Sidebars/right/sections/Page/Spacing';

const Page = () => {
  return (
    <SectionBase id="page">
      <div className="space-y-4">
        <Font />

        <Size />

        <Spacing />

        <LineHeight />
      </div>
    </SectionBase>
  );
};

export default Page;
