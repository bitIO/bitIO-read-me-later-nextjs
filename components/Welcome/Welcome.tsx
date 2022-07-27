import { Anchor, Text, Title } from '@mantine/core';
import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <>
      <Title className={classes.title} align="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span">
          RML
        </Text>
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        <span>This project is a WIP aimed to manage your reading list and take care of </span>
        <span>offering you a daily reading list, removing old stuff, import/export from </span>
        <span>
          services like{' '}
          <Anchor href="https://raindriop.io/" size="lg">
            raindriop
          </Anchor>{' '}
          or{' '}
          <Anchor href="https://getpocket.com/" size="lg">
            pocket
          </Anchor>
        </span>
      </Text>
    </>
  );
}
