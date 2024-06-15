import Export from '@/app/builder/components/Sidebars/right/sections/Export';
import Layout from '@/app/builder/components/Sidebars/right/sections/Layout';
import Page from '@/app/builder/components/Sidebars/right/sections/Page';
import Theme from '@/app/builder/components/Sidebars/right/sections/Theme';
import { Separator } from 'ui';

const RightSidebar = () => {
  return (
    <div className="h-screen overflow-scroll pb-16">
      <div className="grid gap-y-6 p-6">
        <Theme />

        <Separator />

        <Page />

        <Separator />

        <Layout />

        <Separator />

        <Export />
      </div>
    </div>
  );
};

export default RightSidebar;
