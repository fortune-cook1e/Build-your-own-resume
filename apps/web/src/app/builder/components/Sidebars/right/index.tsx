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
      </div>
    </div>
  );
};

export default RightSidebar;
