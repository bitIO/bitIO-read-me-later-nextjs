import { useEffect } from 'react';

import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { parse } from 'query-string';

import ContentLoaderImageGrid from '../../components/ContentLoader/ImageGrid';
import { useRaindrop } from '../../components/Context/Raindrop';

function RaindropCallback() {
  const { push } = useRouter();
  const { raindropState, raindropDispatch } = useRaindrop();
  useEffect(() => {
    const queryParams = parse(window.location.search);
    raindropDispatch({
      payload: {
        ...raindropState,
        session: {
          access_token: queryParams.access_token as string,
          expires: parseInt(queryParams.expires as string, 10),
          expires_in: parseInt(queryParams.expires_in as string, 10),
          refresh_token: queryParams.refresh_token as string,
          token_type: queryParams.token_type as string,
        },
      },
      type: 'authSave',
    });
    push('/raindrop');
  }, []);

  return (
    <Center>
      <ContentLoaderImageGrid />
    </Center>
  );
}

export default RaindropCallback;
