import type React from 'react';
import { Fragment } from 'react';
import styles from './Modal.module.css';

const Backdrop = () => {
  return <div className={styles.backdrop} />;
};

export type ModalOverlayProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

const ModalOverlay = (props: ModalOverlayProps) => {
  return (
    <div className={`${styles.modal} ${props.className || ''}`}>
      <div className={`${styles.contentClassName} ${props.className || ''}`}>
        {props.children}
      </div>
    </div>
  );
};

/**
 * The `Modal` function renders a modal overlay with a backdrop and children
 * components.
 * @param {ModalOverlayProps} props - props is an object containing anything that can be rendered. eg. JSX, html etc.
 * @returns The `Modal` component is being returned. It consists of a `Backdrop` component and a
 * `ModalOverlay` component with `props.children` inside it.
 */
const Modal = (props: ModalOverlayProps) => {
  return (
    <Fragment>
      <Backdrop />
      <ModalOverlay
        className={props.className}
        contentClassName={props.contentClassName}
      >
        {props.children}
      </ModalOverlay>
    </Fragment>
  );
};

export default Modal;
