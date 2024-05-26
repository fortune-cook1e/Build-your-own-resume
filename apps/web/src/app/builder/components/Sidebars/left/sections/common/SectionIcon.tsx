import { useResumeStore } from '@/store/resume';
import { SectionKey } from 'shared';
import { IconButton, Tooltip } from '@chakra-ui/react';
import {
  IconProps,
  ShareNetwork,
  Alien,
  GameController,
  Briefcase,
  GraduationCap,
  PuzzlePiece,
  CompassTool,
  Article,
  Translate,
} from '@phosphor-icons/react';
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
    // Todo: add more icons
    case 'basics':
      return <User size={18} {...props} />;
    case 'summary':
      return <Article size={18} {...props} />;
    case 'profiles':
      return <ShareNetwork size={18} {...props} />;
    case 'experience':
      return <Briefcase size={18} {...props} />;
    case 'education':
      return <GraduationCap size={18} {...props} />;
    case 'projects':
      return <PuzzlePiece size={18} {...props} />;
    case 'interests':
      return <GameController size={18} {...props} />;
    case 'skills':
      return <CompassTool size={18} {...props} />;
    case 'languages':
      return <Translate size={18} {...props} />;
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
