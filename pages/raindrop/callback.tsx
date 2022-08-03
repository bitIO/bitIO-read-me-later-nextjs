import { useEffect } from 'react';

import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { parse } from 'query-string';
import { useCookies } from 'react-cookie';

import ContentLoaderImageGrid from '../../components/ContentLoader/ImageGrid';

function RaindropCallback() {
  const { push } = useRouter();
  const [, setCookies] = useCookies(['raindrop-access']);
  useEffect(() => {
    const queryParams = parse(window.location.search);
    const sessionData = {
      access_token: queryParams.access_token as string,
      expires: parseInt(queryParams.expires as string, 10),
      expires_in: parseInt(queryParams.expires_in as string, 10),
      refresh_token: queryParams.refresh_token as string,
      token_type: queryParams.token_type as string,
    };
    setCookies('raindrop-access', JSON.stringify(sessionData));
    push('/raindrop');
  }, [push, setCookies]);

  return (
    <Center>
      <ContentLoaderImageGrid />
    </Center>
  );
}

export default RaindropCallback;
