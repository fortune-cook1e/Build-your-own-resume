import { useResumeStore } from '@/store/resume';
import { SectionKey, SectionWithItem } from 'shared';
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
  Medal,
  Certificate,
  User,
} from '@phosphor-icons/react';
import { get } from 'lodash-es';
import { FC, ReactElement } from 'react';
import { Button, Tooltip } from 'ui';

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
    case 'awards':
      return <Medal size={18} {...props} />;
    case 'certifications':
      return <Certificate size={18} {...props} />;

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
  ) as SectionWithItem;

  const _name = name ? name : section ? section.name : '';

  const _icon = icon ? icon : getSectionIcon(id) ?? <Alien />;

  return (
    <Tooltip content={_name}>
      <Button isRound size="icon" aria-label="icon button" onClick={onClick}>
        {_icon}
      </Button>
    </Tooltip>
  );
};

export default SectionIcon;
