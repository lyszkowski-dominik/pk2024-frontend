import { Button } from '@mui/material';
import { useState } from 'react';
import { Vote } from '../../features/resolutions/resolutionsTypes';
import VoteConfirmation from './VoteConfirmation';

const OwnersActions = ({ resolutionId }: { resolutionId: number }) => {
  const [isVoteModalOpen, setVoteModalOpen] = useState(false);
  const [selectedVoteOption, setSelectedVoteOption] = useState<Vote>();

  const onVote = (choice: Vote) => {
    setVoteModalOpen(true);
    setSelectedVoteOption(choice);
  };

  return isVoteModalOpen && selectedVoteOption ? (
    <VoteConfirmation
      resolutionId={resolutionId}
      choice={selectedVoteOption}
      onClose={() => setVoteModalOpen(false)}
    />
  ) : (
    <>
      <Button variant="outlined" type="button" onClick={() => onVote(Vote.for)}>
        <span>Za</span>
      </Button>
      <Button
        variant="outlined"
        type="button"
        onClick={() => onVote(Vote.against)}
      >
        <span>Przeciw</span>
      </Button>
      <Button
        variant="outlined"
        type="button"
        onClick={() => onVote(Vote.abstain)}
      >
        <span>Wstrzymaj się</span>
      </Button>
    </>
  );
};

export default OwnersActions;
