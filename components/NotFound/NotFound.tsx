import {
  Button,
  Container,
  createStyles,
  Image,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';

import image from './not-found.svg';

const useStyles = createStyles((theme) => {
  return {
    control: {
      [theme.fn.smallerThan('sm')]: {
        width: '100%',
      },
    },

    desktopImage: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },

    mobileImage: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },

    root: {
      paddingBottom: 80,
      paddingTop: 80,
    },

    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 34,
      fontWeight: 900,
      marginBottom: theme.spacing.md,

      [theme.fn.smallerThan('sm')]: {
        fontSize: 32,
      },
    },
  };
});

function NotFound() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        breakpoints={[
          {
            cols: 1,
            maxWidth: 'sm',
            spacing: 40,
          },
        ]}
        cols={2}
        spacing={80}
      >
        <Image className={classes.mobileImage} src={image} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            className={classes.control}
            mt="xl"
            size="md"
            variant="outline"
          >
            Get back to home page
          </Button>
        </div>
        <Image className={classes.desktopImage} src={image.src} />
      </SimpleGrid>
    </Container>
  );
}

export default NotFound;
