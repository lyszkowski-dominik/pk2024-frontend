import styles from './AuthLayout.module.scss';

type AuthLayoutProps = {
  children: any;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>{children}</div>
    </main>
  );
};

export default AuthLayout;
