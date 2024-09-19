import { useField } from 'formik';
import { useState } from 'react';
import styles from './TextInputLiveFeedback.module.scss';

/**
 * The type `TextInputLiveFeedbackProps` defines props for a text input field component in TypeScript React.
 * @param {string} label - A descriptive label for the text input field.
 * @param {string | undefined} helpText - The `helpText` property in the `TextInputLiveFeedbackProps` type is an optional string that provides additional information or guidance to the user about the input field.
 * @param {string} type - The `type` property in the `TextInputLiveFeedbackProps` type represents the type of input field, such as text, password, email, etc.
 * @param {string | undefined} id - The `id` property in the `TextInputLiveFeedbackProps` type represents the unique identifier for the text input field. It is optional and can be used to associate the input field with a label or other elements on the page.
 * @param {string} name - The `name` property in the `TextInputLiveFeedbackProps` type represents the name of the text input field. It is a required property and must be provided when using the component.
 * @param {string | undefined} className - The `className` property in the `TextInputLiveFeedbackProps` type represents the CSS class name(s) to apply to the text input field. It is optional and can be used to customize the appearance of the input field.
 */
export type TextInputLiveFeedbackProps = {
  label: string,
  helpText?: string,
  type: string,
  id?: string,
  name: string
  className?: string
}

/**
 * 
 * @param {TextInputLiveFeedbackProps} params
 * @returns {JSX.Element} The `TextInputLiveFeedback` component returns a text input field with live feedback based on user input and validation status.
 */
const TextInputLiveFeedback = ({ label, helpText, ...props }: TextInputLiveFeedbackProps) => {
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
      <input
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

export default TextInputLiveFeedback;