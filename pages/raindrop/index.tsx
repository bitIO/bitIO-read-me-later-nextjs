import { useEffect } from 'react';

import { Center } from '@mantine/core';
import { useRouter } from 'next/router';

import ContentLoaderImageGrid from '../../components/ContentLoader/ImageGrid';
import { useRaindrop } from '../../components/Context/Raindrop';

function Raindrop() {
  const { raindropState } = useRaindrop();
  const router = useRouter();
  useEffect(() => {
    async function fetchLocation() {
      if (!raindropState.access_token || raindropState.access_token === '') {
        const response = await fetch('/api/raindrop/authorize');
        const json = await response.json();
        setTimeout(() => {
          router.push(json.location);
        }, 30000);
      }
    }

    fetchLocation();
  }, [raindropState.access_token]);

  if (!raindropState.access_token) {
    return (
      <Center>
        <ContentLoaderImageGrid />
      </Center>
    );
  }
  return <div>Raindrop has access_token</div>;
}

export default Raindrop;
