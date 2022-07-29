import { createStyles } from '@mantine/core';

export default createStyles((theme) => {
  return {
    burger: {
      [theme.fn.largerThan('xs')]: {
        display: 'none',
      },
    },
    header: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
      }`,
      marginBottom: 120,
      paddingTop: theme.spacing.sm,
    },
    mainSection: {
      paddingBottom: theme.spacing.sm,
    },
    tab: {
      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
      },
      '&[data-active]': {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        borderColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[7]
            : theme.colors.gray[2],
      },
      backgroundColor: 'transparent',
      fontWeight: 500,
      height: 38,
    },
    tabs: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
    tabsList: {
      borderBottom: '0 !important',
    },
    user: {
      [theme.fn.smallerThan('xs')]: {
        display: 'none',
      },
      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      },
      borderRadius: theme.radius.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      transition: 'background-color 100ms ease',
    },
    userActive: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  };
});
