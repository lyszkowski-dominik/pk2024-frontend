import styles from './Icon.module.scss';
import AddIcon from '../../../assets/icons/add.svg?react'
import ImportIcon from '../../../assets/icons/upload.svg?react';
import ExportIcon from '../../../assets/icons/download.svg?react';
import OpenIcon from '../../../assets/icons/open.svg?react';
import Logo from '../../../assets/icons/neighbourlink-icon.svg?react';
import Delete from '../../../assets/icons/trash.svg?react';
import Edit from '../../../assets/icons/pen.svg?react';

export const icons = {
  add: AddIcon,
  import: ImportIcon,
  export: ExportIcon,
  logo: Logo,
  open: OpenIcon,
  delete: Delete,
  edit: Edit,
};

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  color?: string;
  className?: string;
}

const Icon = ({ name, size = 24, color, className }: IconProps) => {
  const SVGIcon = icons[name];
  const style = color
    ? { fill: color, width: size, height: size }
    : { width: size, height: size };

  return <SVGIcon className={`${styles.icon} ${className}`} style={style} />;
};

export default Icon;
