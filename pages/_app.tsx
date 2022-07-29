import { useState } from 'react';

import { UserProvider } from '@auth0/nextjs-auth0';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { getCookie, setCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '../components/Layout/Layout';

function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { colorScheme, Component, pageProps } = props;
  const [currentColorScheme, setCurrentColorScheme] =
    useState<ColorScheme>(colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setCurrentColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <>
      <Head>
        <title>read me later</title>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
        <link href="/favicon.svg" rel="shortcut icon" />
      </Head>

      <UserProvider>
        <ColorSchemeProvider
          colorScheme={currentColorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{
              colorScheme,
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider>
              <ModalsProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </UserProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  return {
    colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
  };
};

export default App;
