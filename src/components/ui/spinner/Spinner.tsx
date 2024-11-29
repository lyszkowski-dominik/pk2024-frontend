import { BeatLoader } from 'react-spinners';

type SpinnerProps = {
  size?: number;
};

const Spinner = ({ size }: SpinnerProps) => {
  return <BeatLoader color="var(--pink)" size={size} />;
};

export default Spinner;
