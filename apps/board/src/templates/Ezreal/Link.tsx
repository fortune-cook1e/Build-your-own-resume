import { URL, mergeTailwindCss } from 'shared';
import { FC, ReactNode } from 'react';

interface Props {
  url: URL;
  icon?: ReactNode;
  label?: string;
  classname?: string;
}

const Link: FC<Props> = ({ url, icon, label, classname }) => {
  if (!url.link) return null;

  return (
    <div className="flex items-center gap-x-1.5">
      {icon ?? <i className="ph ph-bold ph-link text-primary" />}
      <a
        href={url.link}
        target="_blank"
        rel="noreferrer noopener nofollow"
        className={mergeTailwindCss('inline-block', classname)}
      >
        {label || url.label || url.link}
      </a>
    </div>
  );
};

export default Link;
