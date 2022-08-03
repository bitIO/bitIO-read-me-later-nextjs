import { useEffect } from 'react';

import { Center, Container } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

import ContentLoaderImageGrid from '../../components/ContentLoader/ImageGrid';
import { useRaindrop } from '../../components/Context/Raindrop';
import RaindropConfiguration from '../../components/RaindropConfiguration/RaindropConfiguration';
import useRaindropUser from '../../hooks/raindrop/useRaindropUser';

function Raindrop() {
  const router = useRouter();
  const { raindropState, raindropDispatch } = useRaindrop();
  const { raindropUserData } = useRaindropUser();

  useEffect(() => {
    async function fetchLocation() {
      if (
        !raindropState.session.access_token ||
        raindropState.session.access_token === ''
      ) {
        setTimeout(() => {
          showNotification({
            id: 'raindrop-authorization-request',
            loading: true,
            message: `Access to Raindrop.io has not yet been granted. Please,
            allow us to read your raindrops`,
            title: `${new Date().toISOString()} - Redirecting to Raindrop.io`,
          });
        }, 100);

        const response = await fetch('/api/raindrop/authorize');
        const json = await response.json();
        setTimeout(() => {
          router.push(json.location);
        }, 3000);
      }
    }

    fetchLocation();
  }, [raindropState.session.access_token]);

  useEffect(() => {
    if (raindropUserData) {
      raindropDispatch({
        payload: {
          ...raindropState,
          user: raindropUserData,
        },
        type: 'authSave',
      });
    }
  }, [raindropState.user, raindropUserData]);

  if (!raindropState.session.access_token) {
    return (
      <Center>
        <ContentLoaderImageGrid />
      </Center>
    );
  }

  if (!raindropState.configuration.initialized) {
    return (
      <Container>
        <RaindropConfiguration />
      </Container>
    );
  }

  return <div>Raindrop has access_token</div>;
}

export default Raindrop;
