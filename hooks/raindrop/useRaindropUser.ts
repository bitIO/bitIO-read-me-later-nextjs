import useSWR from 'swr';

import { useRaindrop } from '../../components/Context/Raindrop';
import { RaindropState, RaindropUserApiResponse } from '../../types/raindrop';
import { fetcherAuthenticated } from '../../utils/fetcher';

function shouldFetch(raindropState: RaindropState) {
  if (!raindropState.user && raindropState.session.access_token) {
    return true;
  }
  return false;
}

function useRaindropUser() {
  const { raindropState } = useRaindrop();
  const { data, error } = useSWR<RaindropUserApiResponse>(
    shouldFetch(raindropState)
      ? [
          'https://api.raindrop.io/rest/v1/user',
          raindropState.session.access_token,
          raindropState.session.token_type,
        ]
      : null,
    fetcherAuthenticated,
  );

  return {
    raindropUserData: data && data.result ? data.user : raindropState.user,
    raindropUserError: error,
  };
}

export default useRaindropUser;
