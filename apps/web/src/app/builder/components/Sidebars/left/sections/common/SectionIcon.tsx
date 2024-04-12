import { useResumeStore } from '@/store/resume';
import { SectionKey } from '@fe-cookie/resume-generator-shared';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { IconProps, ShareNetwork, Alien } from '@phosphor-icons/react';
import { User } from '@phosphor-icons/react';
import { get } from 'lodash-es';
import { FC, ReactElement } from 'react';

interface SectionIconProps {
  id: SectionKey;
  name?: string;
  onClick?: () => void;
  icon?: ReactElement;
}

export const getSectionIcon = (id: SectionKey, props?: IconProps) => {
  switch (id) {
    case 'basics':
      return <User size={18} {...props} />;
    // Todo: add more icons
    case 'profiles':
      return <ShareNetwork size={18} {...props} />;

    case 'experience':
      return <ShareNetwork size={18} {...props} />;

    case 'education':
      return <ShareNetwork size={18} {...props} />;

    case 'projects':
      return <ShareNetwork size={18} {...props} />;

    case 'interests':
      return <ShareNetwork size={18} {...props} />;

    default:
      return null;
  }
};

export const SectionIcon: FC<SectionIconProps> = ({
  id,
  onClick,
  icon,
  name,
}) => {
  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id),
  );

  const _name = section ? section.name : name ? name : '';

  const _icon = icon ? icon : getSectionIcon(id) ?? <Alien></Alien>;

  return (
    <Tooltip label={_name}>
      <IconButton
        isRound
        aria-label="icon button"
        onClick={onClick}
        icon={_icon}
      ></IconButton>
    </Tooltip>
  );
};

export default SectionIcon;
