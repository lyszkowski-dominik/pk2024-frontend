import { Request, stateDisplayMap } from '../../features/requests/requestTypes';
import { Typography } from '@mui/material';

const Details = ({ request }: { request: Request }) => {
  return (
    <>
      <Typography variant="h4" component="h2">
        {request?.title}
      </Typography>
      <Typography color="textPrimary" gutterBottom>
        Stan: {stateDisplayMap[request?.state]}
      </Typography>
      <Typography color="textPrimary" gutterBottom>
        request dodania: {new Date(request?.created || '').toLocaleString()}
      </Typography>
      <Typography color="textPrimary" gutterBottom>
        Autor: {request?.created_by?.name}
      </Typography>
      <Typography color="textPrimary" gutterBottom>
        Zarządca: {request?.assigned_to?.name}
      </Typography>
      <Typography color="textPrimary" gutterBottom>
        Typ zgłoszenia: {request?.type?.title || 'Inne'}
      </Typography>
      <Typography color="textPrimary" gutterBottom>
        Treść:
      </Typography>
      <Typography variant="body2">{request?.description}</Typography>
    </>
  );
};

export default Details;
