import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import styles from './Form.module.scss';
import FormButtons from './FormButtons';
import { ReactNode } from 'react';

export type FormikWrapperProps<T> = {
  header: string;
  initialValues: T;
  validationSchema?: Yup.Schema<T>;
  onSubmit: (values: T, { setSubmitting, setErrors }: FormikHelpers<T>) => void;
  onReset?: () => void;
  submitLabel?: string;
  children?: ((formik: FormikProps<T>) => ReactNode) | ReactNode;
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
        {(formik) => (
          <Form>
            {typeof children === 'function' ? children(formik) : children}
            <FormButtons
              submitLabel={submitLabel}
              submitDisabled={formik.isSubmitting || !formik.isValid}
              cancelDisabled={formik.isSubmitting}
              isLoading={formik.isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikWrapper;
