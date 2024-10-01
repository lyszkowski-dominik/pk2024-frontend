import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeAlert, selectAlerts } from '../../features/alerts/alertsSlice';

const Alerts = () => {
  const alerts = useAppSelector(selectAlerts);
  const dispatch = useAppDispatch();

  return (
    <>
      {alerts.map((alert, index) => (
        <Snackbar
          key={alert.id}
          open={true}
          autoHideDuration={alert.duration || 3000}
          onClose={(event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            dispatch(removeAlert(alert.id));
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          style={{ top: index * 55 + 24 + 'px' }}
        >
          <Alert
            onClose={() => dispatch(removeAlert(alert.id))}
            severity={alert.type as any}
            sx={{ width: '100%' }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default Alerts;
