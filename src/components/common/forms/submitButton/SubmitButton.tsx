import { Button, CircularProgress } from '@mui/material';

/**
 * SubmitButton component
 * @param {string} text - The text to display on the button.
 * @param {boolean} isLoading - A flag indicating whether the button is in a loading state.
 * @param {React.MouseEventHandler<HTMLButtonElement>} onClick - The click event handler for the button.
 */
export type SubmitButtonProps = {
  text: string;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * 
 * @param {SubmitButtonProps} params
 * @returns {JSX.Element} The `SubmitButton` component returns a submit button with a loading spinner when in a loading state.
 */
const SubmitButton = ({ text, isLoading, onClick }: SubmitButtonProps) => {
  
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
      <span>{isLoading ? <CircularProgress size={20}/> : text}</span>
    </Button>
  );
};

export default SubmitButton;
