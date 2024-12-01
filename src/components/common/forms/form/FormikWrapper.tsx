import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import styles from './Form.module.scss';
import FormButtons from './FormButtons';
import { ReactNode } from 'react';

export type FormikWrapperProps<T> = {
  header?: string;
  initialValues: T;
  validationSchema?: Yup.Schema<T>;
  disabled?: boolean;
  onSubmit: (values: T, { setSubmitting, setErrors }: FormikHelpers<T>) => void;
  onCancel: () => void;
  submitLabel?: string;
  children?: ((formik: FormikProps<T>) => ReactNode) | ReactNode;
};

const FormikWrapper = <T extends object>({
  header,
  initialValues,
  validationSchema,
  disabled = false,
  onSubmit,
  onCancel,
  submitLabel,
  children,
}: FormikWrapperProps<T>) => {
  return (
    <div className={styles.container}>
      {header && <h1>{header}</h1>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <fieldset className={styles.fieldset} disabled={disabled}>
              {typeof children === 'function' ? children(formik) : children}
              <FormButtons
                onCancel={onCancel}
                submitLabel={submitLabel}
                submitDisabled={
                  formik.isSubmitting || !formik.isValid || disabled
                }
                cancelDisabled={formik.isSubmitting || disabled}
                isLoading={formik.isSubmitting}
              />
            </fieldset>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikWrapper;
