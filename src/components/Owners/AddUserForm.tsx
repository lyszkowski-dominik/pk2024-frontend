import { Form, FormikProvider, useFormik } from 'formik';
import TextInputLiveFeedback from '../forms/textInputLiveFeedback/TextInputLiveFeedback';
import Select from '@mui/material/Select';
import styles from '../passwordChangeForm/PasswordChangeForm.module.scss';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import { CreateNewUser } from '../../utils/CreateNewUser';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../app/slices/sharedDataSlice';
import { useNotifications } from '../notifications/NotificationContext';


const AddUserForm = ({ isModalOn, refreshList }: { isModalOn: (value: boolean) => void, refreshList: () => void }) => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{
    email?: string,
    first_name?: string,
    last_name?: string,
    role?: string,
    hoaID?: number
  } | null>(null);
  const { addNotification } = useNotifications();
  // const path = window.location.pathname; // /hoa/1
  // const hoaID = parseInt(path.split('/').pop() || '', 10); // 1
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;

  const formik = useFormik({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      role: 'owner',
      hoa: hoaID
    },
    onSubmit: async (values) => {
      console.log(values);
      setIsWaiting(true);
      const res = await CreateNewUser(values);
      if (res.status === 400) {
        setErrorMessages(res.data);
        console.log(res.data);
        setIsError(true);
      } else {
        setIsError(false);
        setIsSuccess(true);
        addNotification("Użytkownik został dodany.", 'success');
        isModalOn(false);
      }
      setIsWaiting(false);
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Niepoprawny adres email').required('Email jest wymagany'),
      first_name: Yup.string().required('Imię jest wymagane'),
      last_name: Yup.string().required('Nazwisko jest wymagane'),
      role: Yup.string().required('Rola jest wymagana')
    })
  });
  const [isWaiting, setIsWaiting] = useState(false);

  return (
    <div className={styles.container}>
      <h1>Dodawanie nowego użytkownika</h1>
      {/* {isSuccess && <div className={styles.success}>Użytkownik został utworzony.
        <div className={styles.buttons}>
          <Button className={styles.cancel_button} type="button" onClick={() => {
            isModalOn(false);
            // window.location.reload();
            refreshList();
          }}>Zamknij
          </Button>
        </div>
      </div>} */}
      {!isSuccess &&
        <FormikProvider value={formik}>
          <Form>
            <TextInputLiveFeedback label="Imię" type="text" name="first_name" />
            <TextInputLiveFeedback label="Nazwisko" type="text" name="last_name" />
            <TextInputLiveFeedback label="Email" type="email" name="email" />
            <FormControl>
              <InputLabel id="role">Rola</InputLabel>
              <Select labelId="role" id="role" value={formik.values.role} onChange={formik.handleChange} name="role">
                <MenuItem value="admin">Administrator</MenuItem>
                <MenuItem value="owner">Właściciel</MenuItem>
                <MenuItem value="manager">Zarządca</MenuItem>
              </Select>
            </FormControl>
            {isError && (
              <div className={styles.error}>
                {errorMessages?.email && <div>{errorMessages.email}</div>}
                {errorMessages?.first_name && <div>{errorMessages.first_name}</div>}
                {errorMessages?.last_name && <div>{errorMessages.last_name}</div>}
                {errorMessages?.role && <div>{errorMessages.role}</div>}
              </div>
            )}
            {!isWaiting && (
              <div className={styles.buttons}>
                <Button variant='contained' className={styles.change} type="submit">Stwórz</Button>
                <Button color='secondary' className={styles.cancel} type="reset" onClick={() => {
                  isModalOn(false);
                }}>Anuluj
                </Button>
              </div>
            )
            }
            {isWaiting && (
              <div className={styles.waiting}><CircularProgress color="primary" sx={{ fontSize: 40 }} /></div>)}
          </Form>
        </FormikProvider>
      }
    </div>
  );
};

export default AddUserForm;