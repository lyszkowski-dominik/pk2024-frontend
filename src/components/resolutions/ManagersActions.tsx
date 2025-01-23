import { Button } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

import EditResolutionForm from './EditResolutionForm';
import {
  Resolution,
  ResolutionState,
} from '../../features/resolutions/resolutionsTypes';
import Modal from '../ui/modal/Modal';
import DeleteResolutionConfirmation from './DeleteResolutionConfirmation';

const ManagersActions = ({ resolution }: { resolution: Resolution }) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const now = dayjs();
  const { state, start_date, end_date } = resolution;
  const canEdit = state === ResolutionState.active;
  const canClose = now > dayjs(end_date);

  return (
    <>
      {isEditModalOpen && (
        <Modal>
          <EditResolutionForm
            initialData={resolution}
            onClose={() => setEditModalOpen(false)}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <DeleteResolutionConfirmation
          resolution={resolution}
          onClose={() => {
            setEditModalOpen(false);
            navigate('/hoa/' + resolution.hoa + '/resolutions');
          }}
        />
      )}
      {canEdit && (
        <>
          <Button
            variant="outlined"
            type="button"
            onClick={() => setEditModalOpen(true)}
          >
            <span>Edytuj</span>
          </Button>
          <Button
            variant="outlined"
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            color="error"
          >
            <span>Usuń</span>
          </Button>
        </>
      )}
    </>
  );
};

export default ManagersActions;
