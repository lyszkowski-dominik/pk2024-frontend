import type { icons } from '../icon/Icon';
import Icon from '../icon/Icon';
import styles from './IconButton.module.scss';

type IconButtonProps = {
  iconName: keyof typeof icons;
  onClick: (event?: any) => void;
  altText: string;
  size?: number;
  margin?: number;
  color?: string;
};

const IconButton = ({
  iconName,
  onClick,
  altText,
  size = 24,
  margin = 0,
  color = 'var(--pink)',
}: IconButtonProps) => {
  return (
    <button
      className={styles.iconButton}
      onClick={onClick}
      aria-label={altText}
      style={{ width: size, marginBottom: margin }}
    >
      <Icon name={iconName} size={size} color={color} className={styles.icon} />
    </button>
  );
};

export default IconButton;
