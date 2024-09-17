import type { icons } from '../icon/Icon';
import Icon from '../icon/Icon';
import styles from './IconButton.module.scss';

type IconButtonProps = {
  iconName: keyof typeof icons;
  onClick: (event?: any) => void;
  altText: string;
  size?: number;
  color?: string;
};

const IconButton = ({
  iconName,
  onClick,
  altText,
  size,
  color,
}: IconButtonProps) => {
  return (
    <button
      className={styles.iconButton}
      onClick={onClick}
      aria-label={altText}
      style={{ width: size }}
    >
      <Icon name={iconName} size={size} color={color} className={styles.icon} />
    </button>
  );
};

export default IconButton;
