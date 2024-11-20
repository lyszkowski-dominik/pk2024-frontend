import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import styles from './Form.module.scss';
import FormButtons from './FormButtons';

export type FormikWrapperProps<T> = {
  header: string;
  initialValues: T;
  validationSchema?: Yup.Schema<T>;
  onSubmit: (values: T, { setSubmitting, setErrors }: FormikHelpers<T>) => void;
  onReset?: () => void;
  submitLabel?: string;
  children?: React.ReactNode;
};

const FormikWrapper = <T extends object>({
  header,
  initialValues,
  validationSchema,
  onSubmit,
  onReset,
  submitLabel,
  children,
}: FormikWrapperProps<T>) => {
  return (
    <div className={styles.container}>
      <h1>{header}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        onReset={onReset}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            {children}
            <FormButtons
              submitLabel={submitLabel}
              submitDisabled={isSubmitting || !isValid}
              cancelDisabled={isSubmitting}
              isLoading={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikWrapper;
