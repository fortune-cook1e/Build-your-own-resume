import Links from '@/components/HeaderToolsBar/Links';
import Theme from '@/components/HeaderToolsBar/Theme';

const HeaderToolsBar = () => {
  return (
    <div className="sticky inset-x-0 top-0 z-20 bg-white/95 dark:border-slate-50/[0.06] dark:bg-slate-900 lg:border-b lg:border-slate-900/10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-4 border-b border-slate-900/10 py-4 dark:border-slate-300/10 lg:mx-0 lg:border-0 lg:px-8">
          <div className="relative flex items-center justify-end gap-x-2">
            <Theme />
            <Links />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderToolsBar;
