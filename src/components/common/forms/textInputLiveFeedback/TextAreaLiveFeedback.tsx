import { useField } from 'formik';
import { useState } from 'react';
import styles from '../form/Form.module.scss';

/**
 * The type `TextAreaLiveFeedbackProps` defines props for a textarea input field component in TypeScript React.
 * @param {string} label - A descriptive label for the textarea input field.
 * @param {string | undefined} helpText - The `helpText` property in the `TextAreaLiveFeedbackProps` type is an optional string that provides additional information or guidance to the user about the input field.
 * @param {string | undefined} id - The `id` property in the `TextAreaLiveFeedbackProps` type represents the unique identifier for the textarea input field. It is optional and can be used to associate the textarea with a label or other elements on the page.
 * @param {string} name - The `name` property in the `TextAreaLiveFeedbackProps` type represents the name of the textarea input field. It is a required property and must be provided when using the component.
 * @param {string | undefined} className - The `className` property in the `TextAreaLiveFeedbackProps` type represents the CSS class name(s) to apply to the textarea input field. It is optional and can be used to customize the appearance of the textarea.
 */
export type TextAreaLiveFeedbackProps = {
  label: string;
  helpText?: string;
  id?: string;
  name: string;
  className?: string;
};

/**
 *
 * @param {TextAreaLiveFeedbackProps} params
 * @returns {JSX.Element} The `TextAreaLiveFeedback` component returns a textarea input field with live feedback based on user input and validation status.
 */
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
        <div
          id={`${props.id}-feedback`}
          aria-live="polite"
          className={`${styles.feedback} ${styles.text_sm}`}
        >
          {showFeedback && meta.error}
        </div>
      </div>
    </div>
  );
};

export default TextAreaLiveFeedback;
