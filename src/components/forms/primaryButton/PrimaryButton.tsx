import { Button, CircularProgress } from '@mui/material';

type PrimaryButtonProps = {
  text: string;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const PrimaryButton = ({ text, isLoading, onClick }: PrimaryButtonProps) => {
  const styles = {
    backgroundColor: 'var(--darkGreen)',
    ':hover': {
      backgroundColor: 'var(--darkGreen)',
      filter: 'brightness(85%)',
    },
  };

  return (
    <Button
      disabled={isLoading}
      variant="contained"
      sx={styles}
      type="submit"
      onClick={onClick}
    >
      <span>{isLoading ? <CircularProgress size={20} /> : text}</span>
    </Button>
  );
  
};

export default PrimaryButton;
