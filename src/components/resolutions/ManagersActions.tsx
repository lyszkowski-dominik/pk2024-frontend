import { Button } from '@mui/material';
import { useState } from 'react';
import EditResolutionForm from './EditResolutionForm';
import { Resolution } from '../../features/resolutions/resolutionsTypes';
import Modal from '../ui/modal/Modal';
import DeleteResolutionConfirmation from './DeleteResolutionConfirmation';
import { useNavigate } from 'react-router';

const ManagersActions = ({ resolution }: { resolution: Resolution }) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

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
  );
};

export default ManagersActions;
