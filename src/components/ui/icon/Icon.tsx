import styles from './Icon.module.scss';
import AddIcon from '../../../icons/add.svg?react';
import ImportIcon from '../../../icons/upload.svg?react';
import ExportIcon from '../../../icons/download.svg?react';
import Logo from '../../../icons/neighbourlink-icon.svg?react';

export const icons = {
  add: AddIcon,
  import: ImportIcon,
  export: ExportIcon,
  logo: Logo,
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
