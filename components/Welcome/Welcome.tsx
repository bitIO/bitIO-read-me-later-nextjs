import { useUser } from '@auth0/nextjs-auth0';
import { Anchor, Group, Text, Title } from '@mantine/core';

import useStyles from './Welcome.styles';

import Auth0Button from '../Auth0Button/Auth0Button';

export function Welcome() {
  const { classes } = useStyles();
  const { user } = useUser();

  return (
    <>
      <Title align="center" className={classes.title} mt={100}>
        Welcome {user?.name} to{' '}
        <Text component="span" inherit variant="gradient">
          RML
        </Text>
      </Title>
      <Text align="center" color="dimmed" mt="xl" mx="auto" size="lg" sx={{ maxWidth: 580 }}>
        <span>This project is a WIP aimed to manage your reading list and take care of </span>
        <span>offering you a daily reading list, removing old stuff, import/export from </span>
        <span>
          services like{' '}
          <Anchor href="https://raindrop.io/" size="lg">
            raindrop
          </Anchor>{' '}
          or{' '}
          <Anchor href="https://getpocket.com/" size="lg">
            pocket
          </Anchor>
        </span>
      </Text>
      {!user && (
        <Group position="center" sx={{ padding: 15 }}>
          <Auth0Button>Login with Auth0</Auth0Button>
        </Group>
      )}
    </>
  );
}
