import { useBoardStore } from '@/store/board';
import Link from '@/templates/Ezreal/Link';

const Header = () => {
  const basics = useBoardStore((state) => state.resume.basics);
  const profiles = useBoardStore((state) => state.resume.sections.profiles);

  return (
    <div className="flex items-center justify-between space-x-4 border-b border-primary pb-5">
      {/* <Picture /> */}

      <div className="flex-1 space-y-2">
        <div>
          <div className="text-2xl font-bold">{basics.name}</div>
          <div className="text-base">{basics.headline}</div>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
          {basics.location && (
            <div className="flex items-center gap-x-1.5">
              <i className="ph ph-bold ph-map-pin text-primary" />
              <div>{basics.location}</div>
            </div>
          )}
          {basics.phone && (
            <div className="flex items-center gap-x-1.5">
              <i className="ph ph-bold ph-phone text-primary" />
              <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer">
                {basics.phone}
              </a>
            </div>
          )}
          {basics.email && (
            <div className="flex items-center gap-x-1.5">
              <i className="ph ph-bold ph-at text-primary" />
              <a
                href={`mailto:${basics.email}`}
                target="_blank"
                rel="noreferrer"
              >
                {basics.email}
              </a>
            </div>
          )}
          <Link url={basics.url} />
          {/* {basics.customFields.map((item) => (
            <div key={item.id} className="flex items-center gap-x-1.5">
              <i className={cn(`ph ph-bold ph-${item.icon}`, 'text-primary')} />
              <span>{[item.name, item.value].filter(Boolean).join(': ')}</span>
            </div>
          ))} */}
        </div>
      </div>

      {profiles.visible && profiles.items.length > 0 && (
        <div
          className="grid gap-x-4 gap-y-1 text-right"
          style={{ gridTemplateColumns: `repeat(${1}, auto)` }}
        >
          {profiles.items
            .filter((item) => item.visible)
            .map((item) => (
              <div key={item.id} className="flex items-center gap-x-2">
                <Link
                  url={item.url}
                  label={item.username}
                  classname="text-sm"
                  icon={
                    <img
                      className="ph"
                      width={18}
                      height={18}
                      alt={item.network}
                      src={`https://cdn.simpleicons.org/${item.icon}`}
                    />
                  }
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Header;
