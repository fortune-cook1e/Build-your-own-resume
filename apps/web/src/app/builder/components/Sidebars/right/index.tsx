import Export from '@/app/builder/components/Sidebars/right/sections/Export';
import Layout from '@/app/builder/components/Sidebars/right/sections/Layout';
import Page from '@/app/builder/components/Sidebars/right/sections/Page';
import Theme from '@/app/builder/components/Sidebars/right/sections/Theme';
import { Divider } from '@chakra-ui/react';

const RightSidebar = () => {
  return (
    <div className="h-screen pb-16 overflow-scroll">
      <div className="grid gap-y-6 p-6">
        <Theme />

        <Divider />

        <Page />

        <Divider />

        <Layout />

        <Divider />

        <Export />
      </div>
    </div>
  );
};

export default RightSidebar;
