import { useField } from 'formik';
import { useState } from 'react';
import styles from './TextInputLiveFeedback.module.scss';

type TextAreaLiveFeedbackProps = {
  label: string;
  helpText?: string;
  id?: string;
  name: string;
  className?: string;
};

const TextAreaLiveFeedback = ({
  label,
  helpText,
  ...props
}: TextAreaLiveFeedbackProps) => {
  const [field, meta] = useField(props);
  // Show inline feedback if EITHER
  // - the input is focused AND value is longer than 2 characters
  // - or, the has been visited (touched === true)
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    (didFocus && field.value.trim().length > 2) || meta.touched;

  return (
    <div
      className={`${styles.form_control} ${showFeedback ? (meta.error ? styles.invalid : styles.valid) : ''}`}
    >
      <div>
        <label htmlFor={props.id}>{label}</label>{' '}
        {showFeedback ? (
          <div
            id={`${props.id}-feedback`}
            aria-live="polite"
            className={`${styles.feedback} ${styles.text_sm}`}
          >
            {meta.error ? meta.error : '✓'}
          </div>
        ) : null}
      </div>
      <textarea
        {...props}
        {...field}
        aria-describedby={`${props.id}-feedback ${props.id}-help`}
        onFocus={handleFocus}
        className={props.className}
      />
      {/*@ts-ignore*/}
      <div className={styles.text_xs} id={`${props.id}-help`} tabIndex="-1">
        {helpText}
      </div>
    </div>
  );
};

export default TextAreaLiveFeedback;
