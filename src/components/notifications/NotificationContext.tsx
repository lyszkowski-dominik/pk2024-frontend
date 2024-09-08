import { Alert, Snackbar } from '@mui/material';
import { createContext, useContext, useRef, useState } from 'react';

export type Notification = {
  id: number;
  message: string;
  type: string;
  duration: number;
};

type NotificationContextType = {
  addNotification: (message: string, type?: string, duration?: number) => void;
};
const NotificationContext = createContext<NotificationContextType>({
  addNotification: (message: string, type?: string, duration?: number) => {},
});

export const useNotifications = () =>
  useContext<NotificationContextType>(NotificationContext);

export const NotificationProvider = ({ children }: { children: any }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timeoutsRef = useRef<any>({});

  const addNotification = (message: string, type = 'info', duration = 3000) => {
    const id = Date.now();
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, message, type, duration },
    ]);

    const timeoutId = setTimeout(() => {
      removeNotification(id);
    }, duration);

    timeoutsRef.current[id] = timeoutId;
  };

  const removeNotification = (id: number) => {
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id];
    }

    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id),
    );
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}

      <div
        style={{
          position: 'fixed',
          top: 10,
          left: 10,
          right: 10,
          zIndex: 1300,
        }}
      >
        {notifications.map((notification) => (
          <Snackbar
            key={notification.id}
            open={true}
            autoHideDuration={notification.duration || 3000}
            onClose={(event, reason) => {
              if (reason === 'clickaway') {
                return;
              }
              removeNotification(notification.id);
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={() => removeNotification(notification.id)}
              severity={notification.type as any}
              sx={{ width: '100%' }}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
