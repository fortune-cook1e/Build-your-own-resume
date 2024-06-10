import Left from '@/components/HeaderToolsBar/Left';
import Links from '@/components/HeaderToolsBar/Links';
import Theme from '@/components/HeaderToolsBar/Theme';

const HeaderToolsBar = () => {
  return (
    <div className="sticky inset-x-0 top-0 z-20 bg-white/95 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.5] dark:bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="mx-4 border-b py-4 lg:mx-0 lg:border-0 lg:px-8 dark:border-slate-300/10">
          <div className="relative flex items-center justify-between">
            <Left />

            <div className="ml-auto">
              <Theme />
              <Links />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderToolsBar;
