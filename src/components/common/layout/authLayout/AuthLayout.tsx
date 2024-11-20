import styles from './AuthLayout.module.scss';

/**
 * The type `AuthLayoutProps` defines props for the `AuthLayout` component in TypeScript React.
 * @param {any} children - The `children` property in the `AuthLayoutProps` type represents the child components or elements that will be rendered inside the `AuthLayout` component.
 */
export type AuthLayoutProps = {
  children: any;
};

/**
 * 
 * @param {AuthLayoutProps} params
 * @returns {JSX.Element} The `AuthLayout` component returns a layout for authentication pages.
 */
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>{children}</div>
    </main>
  );
};

export default AuthLayout;
