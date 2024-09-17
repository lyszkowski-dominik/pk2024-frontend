// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import { useAddCommunityMutation } from '../../app/slices/communitiesDataApiSlice';
// import Spinner from '../ui/spinner/Spinner';
// import styles from './AddCommunityForm.module.scss';
// import { useState, type SetStateAction } from 'react';

// type AddCommunityFormProps = {
//   isModalOn: React.Dispatch<SetStateAction<boolean>>;
// };

// const communitySchema = Yup.object().shape({
//   name: Yup.string().required('Nazwa jest wymagana'),
//   address: Yup.string().required('Adres jest wymagany'),
//   contact_info: Yup.string()
//     .email('Nieprawidłowy adres email')
//     .required('Email jest wymagany'),
// });

// const AddCommunityForm = ({ isModalOn }: AddCommunityFormProps) => {
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isWaiting, setIsWaiting] = useState(false);
//   const [errorMessages, setErrorMessages] = useState<{ errors: string } | null>(
//     null,
//   );
//   const [addCommunity, { isLoading, isError, error }] =
//     useAddCommunityMutation();

//   return (
//     <div className={styles.container}>
//       <h1>Dodaj wspólnotę</h1>
//       {isSuccess && (
//         <div className={styles.success}>
//           Wspólnota została dodana
//           <div className={styles.buttons}>
//             <button
//               className={styles.cancel_button}
//               type="button"
//               onClick={() => {
//                 isModalOn(false);
//               }}
//             >
//               Zamknij
//             </button>
//           </div>
//         </div>
//       )}
//       {!isSuccess && (
//         <Formik
//           initialValues={{
//             name: '',
//             address: '',
//             contact_info: '',
//           }}
//           validationSchema={communitySchema}
//           onSubmit={async (values, { setSubmitting }) => {
//             try {
//               setIsWaiting(true);
//               const response = await addCommunity(values).unwrap();
//               setIsSuccess(true);
//             } catch (error) {
//               console.log(error);
//               setIsSuccess(false);
//             }
//             setIsWaiting(false);
//             setSubmitting(false);
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <div>
//                 <label htmlFor="name">Nazwa:</label>
//                 <Field name="name" type="text" />
//                 <ErrorMessage name="name" component="div" />
//               </div>
//               <div>
//                 <label htmlFor="address">Adres:</label>
//                 <Field name="address" type="text" />
//                 <ErrorMessage name="address" component="div" />
//               </div>
//               <div>
//                 <label htmlFor="contact_info">E-mail:</label>
//                 <Field name="contact_info" type="email" />
//                 <ErrorMessage name="contact_info" component="div" />
//               </div>
//               <button type="submit" disabled={isSubmitting}>
//                 Dodaj wspólnotę
//               </button>
//               <button
//                 className={styles.cancel}
//                 type="reset"
//                 onClick={() => {
//                   isModalOn(false);
//                 }}
//               >
//                 Anuluj
//               </button>
//               {/* {isWaiting && (
//               <div className={styles.waiting}><Spinner /></div>)} */}
//             </Form>
//           )}
//         </Formik>
//       )}
//     </div>
//   );
// };

// export default AddCommunityForm;
