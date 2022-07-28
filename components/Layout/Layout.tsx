import { useUser } from '@auth0/nextjs-auth0';
import { AppShell } from '@mantine/core';

import useStyles from './Layout.styles';

import { Header } from '../Header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { classes } = useStyles();
  const { error, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <AppShell className={classes.main} header={<Header />}>
      <main>{children}</main>
    </AppShell>
  );
}
